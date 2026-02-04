# Judge0 Self-Hosted Code Execution Platform

A self-hosted LeetCode-style code execution platform using Judge0, BullMQ, and Docker.

![Code Judge](https://img.shields.io/badge/Languages-14+-blue) ![Docker](https://img.shields.io/badge/Docker-Ready-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- **Monaco Editor** - VS Code's editor in the browser
- **14 Languages** - Python, JavaScript, TypeScript, C, C++, Java, Go, Rust, Ruby, PHP, C#, Kotlin, Swift, Bash
- **Job Queue** - BullMQ with Redis for handling concurrent submissions
- **Queue Dashboard** - Real-time monitoring of all submissions
- **Sandboxed Execution** - Judge0 + isolate for secure code execution
- **Test Cases** - Run code against multiple test cases with expected output matching

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│ API Gateway │────▶│   BullMQ    │────▶│   Judge0    │
│   (Nginx)   │     │  (Node.js)  │     │   (Redis)   │     │  (isolate)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     :8080               :3000              :6380              :2358
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Linux with cgroup v1 (for Judge0 isolate sandbox)

### Run

```bash
git clone https://github.com/aryan877/j0-poc.git
cd j0-poc
docker compose up -d
```

### Access

| Service | URL |
|---------|-----|
| Playground | http://localhost:8080 |
| API | http://localhost:3000 |
| Queue Dashboard | http://localhost:3000/admin/queues |
| Judge0 | http://localhost:2358 |

## Ubuntu 24.04 Setup (cgroup v1)

Judge0 requires cgroup v1. If you're on Ubuntu 24.04 (which uses v2 by default):

```bash
# Add to /etc/default/grub
GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=0"

# Update and reboot
sudo update-grub
sudo reboot
```

## API Endpoints

### Submit Code
```bash
POST /submit
{
  "source_code": "print('hello')",
  "language_id": 71,
  "stdin": ""
}
```

### Get Submission
```bash
GET /submission/:id
```

### Get Languages
```bash
GET /languages
```

### Queue Stats
```bash
GET /stats
```

## Language IDs

| Language | ID |
|----------|-----|
| Python 3 | 71 |
| JavaScript | 63 |
| TypeScript | 74 |
| C | 50 |
| C++ | 54 |
| Java | 62 |
| Go | 60 |
| Rust | 73 |
| Ruby | 72 |
| PHP | 68 |
| C# | 51 |
| Kotlin | 78 |
| Swift | 83 |
| Bash | 46 |

## Project Structure

```
├── docker-compose.yml    # All services orchestration
├── judge0.conf           # Judge0 configuration
├── api-gateway/          # Node.js API server
│   ├── src/index.js      # Express + BullMQ setup
│   └── Dockerfile
└── frontend/             # Static frontend
    ├── index.html
    ├── app.js            # Main application logic
    ├── problems.js       # Problem definitions & test cases
    └── styles.css
```

## Configuration

Edit `judge0.conf` for:
- CPU/Memory limits
- Execution timeouts
- Max processes
- Network access

Edit `docker-compose.yml` for:
- Worker replicas
- Port mappings
- Redis passwords

## License

MIT
