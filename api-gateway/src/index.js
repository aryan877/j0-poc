const express = require("express");
const cors = require("cors");
const { Queue, Worker } = require("bullmq");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// bullmq - when user submits code, we dont process it immediately
// instead we add it to a queue and a worker picks it up. this way if 100 ppl submit at once
// we dont crash, we just process them one by one (or 5 at a time with concurrency)
//
// all the queue data gets stored in redis (queue-redis in docker, not the judge0 one)

// connect to our redis (queue-redis)
const redisConnection = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT) || 6380,
  password: process.env.REDIS_PASSWORD || "QueueRedisPassword123",
  maxRetriesPerRequest: null,
};

const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";

// create our queues
const codeQueue = new Queue("code-execution", { connection: redisConnection });
const highPriorityQueue = new Queue("high-priority", {
  connection: redisConnection,
});

// bull board - gives us a nice dashboard to see whats in the queue
// available at /admin/queues
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(codeQueue), new BullMQAdapter(highPriorityQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

// storing results in memory for now, use redis/db in prod
const submissions = new Map();

// language ids from judge0
const LANGUAGES = [
  {
    id: 71,
    name: "Python 3",
    monaco: "python",
    template: 'print("Hello, World!")',
  },
  {
    id: 63,
    name: "JavaScript (Node.js)",
    monaco: "javascript",
    template: 'console.log("Hello, World!");',
  },
  {
    id: 74,
    name: "TypeScript",
    monaco: "typescript",
    template: 'console.log("Hello, World!");',
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    monaco: "cpp",
    template:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
    monaco: "c",
    template:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  },
  {
    id: 62,
    name: "Java",
    monaco: "java",
    template:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  {
    id: 60,
    name: "Go",
    monaco: "go",
    template:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  },
  {
    id: 73,
    name: "Rust",
    monaco: "rust",
    template: 'fn main() {\n    println!("Hello, World!");\n}',
  },
  { id: 72, name: "Ruby", monaco: "ruby", template: 'puts "Hello, World!"' },
  {
    id: 68,
    name: "PHP",
    monaco: "php",
    template: '<?php\necho "Hello, World!";\n?>',
  },
  {
    id: 51,
    name: "C#",
    monaco: "csharp",
    template:
      'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  },
  { id: 46, name: "Bash", monaco: "shell", template: 'echo "Hello, World!"' },
];

// the worker - this guy actually does the work
// sits there waiting for jobs, when one comes in it sends it to judge0
const worker = new Worker(
  "code-execution",
  async (job) => {
    const { source_code, language_id, stdin, submissionId } = job.data;

    submissions.set(submissionId, {
      ...submissions.get(submissionId),
      status: "processing",
      startedAt: new Date().toISOString(),
    });

    // send to judge0
    const response = await axios.post(
      `${JUDGE0_URL}/submissions?wait=true`,
      {
        source_code,
        language_id,
        stdin: stdin || "",
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      },
    );

    const result = {
      ...response.data,
      submissionId,
      status: "completed",
      completedAt: new Date().toISOString(),
    };

    submissions.set(submissionId, result);
    return result;
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
);

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
  if (job.data.submissionId) {
    submissions.set(job.data.submissionId, {
      submissionId: job.data.submissionId,
      status: "failed",
      error: err.message,
      completedAt: new Date().toISOString(),
    });
  }
});

// routes

app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/languages", (_, res) => {
  res.json(LANGUAGES);
});

// submit code - adds to queue, returns immediately
app.post("/submit", async (req, res) => {
  const { source_code, language_id, stdin, priority } = req.body;

  if (!source_code || !language_id) {
    return res.status(400).json({ error: "need source_code and language_id" });
  }

  const submissionId = uuidv4();
  const queue = priority === "high" ? highPriorityQueue : codeQueue;

  submissions.set(submissionId, {
    submissionId,
    status: "queued",
    language_id,
    createdAt: new Date().toISOString(),
  });

  // add to queue - worker will pick it up
  const job = await queue.add(
    "execute",
    {
      source_code,
      language_id,
      stdin,
      submissionId,
    },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    },
  );

  res.json({
    submissionId,
    jobId: job.id,
    status: "queued",
  });
});

app.get("/submission/:id", (req, res) => {
  const submission = submissions.get(req.params.id);
  if (!submission) {
    return res.status(404).json({ error: "not found" });
  }
  res.json(submission);
});

// stats for dashboard
app.get("/stats", async (_, res) => {
  const [waiting, active, completed, failed] = await Promise.all([
    codeQueue.getWaitingCount(),
    codeQueue.getActiveCount(),
    codeQueue.getCompletedCount(),
    codeQueue.getFailedCount(),
  ]);

  res.json({
    queues: { "code-execution": { waiting, active, completed, failed } },
    totalSubmissions: submissions.size,
  });
});

app.get("/recent", (_, res) => {
  const limit = 20;
  const recent = Array.from(submissions.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
  res.json(recent);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Queue dashboard: http://localhost:${PORT}/admin/queues`);
});
