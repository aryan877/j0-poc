// all problems stored here - add more as needed
const PROBLEMS = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
      <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
      <p>You can return the answer in any order.</p>`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    testCases: [
      { input: '[2,7,11,15]\n9', expected: '[0,1]' },
      { input: '[3,2,4]\n6', expected: '[1,2]' },
      { input: '[3,3]\n6', expected: '[0,1]' }
    ],
    starterCode: {
      python: `def two_sum(nums, target):
    # your code here
    pass

nums = eval(input())
target = int(input())
print(two_sum(nums, target))`,
      javascript: `function twoSum(nums, target) {
    // your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    console.log(JSON.stringify(twoSum(nums, target)));
});`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    // your code here
    return [];
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines: string[] = [];
rl.on('line', (line: string) => lines.push(line));
rl.on('close', () => {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    console.log(JSON.stringify(twoSum(nums, target)));
});`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    // parse [2,7,11,15]
    vector<int> nums;
    stringstream ss(line.substr(1, line.size()-2));
    int n;
    while(ss >> n) { nums.push_back(n); if(ss.peek()==',') ss.ignore(); }
    int target;
    cin >> target;
    auto result = twoSum(nums, target);
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // your code here
    *returnSize = 2;
    int* result = malloc(2 * sizeof(int));
    result[0] = 0;
    result[1] = 0;
    return result;
}

int main() {
    char line1[10000], line2[100];
    fgets(line1, sizeof(line1), stdin);
    fgets(line2, sizeof(line2), stdin);

    // parse [2,7,11,15]
    int nums[10000], numsSize = 0;
    char* p = line1 + 1; // skip [
    while (*p && *p != ']') {
        nums[numsSize++] = atoi(p);
        while (*p && *p != ',' && *p != ']') p++;
        if (*p == ',') p++;
    }

    int target = atoi(line2);

    int returnSize;
    int* result = twoSum(nums, numsSize, target, &returnSize);
    printf("[%d,%d]\\n", result[0], result[1]);
    free(result);
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // your code here
        return new int[]{};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        // parse [2,7,11,15]
        line = line.substring(1, line.length()-1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for(int i=0; i<parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());
        int target = sc.nextInt();
        int[] result = twoSum(nums, target);
        System.out.println("[" + result[0] + "," + result[1] + "]");
    }
}`,
      go: `package main

import (
    "fmt"
    "encoding/json"
    "bufio"
    "os"
)

func twoSum(nums []int, target int) []int {
    // your code here
    return []int{}
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    line, _ := reader.ReadString('\\n')
    var nums []int
    json.Unmarshal([]byte(line), &nums)
    var target int
    fmt.Scan(&target)
    result := twoSum(nums, target)
    out, _ := json.Marshal(result)
    fmt.Println(string(out))
}`,
      rust: `use std::io::{self, BufRead};

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // your code here
    vec![]
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let line = lines.next().unwrap().unwrap();
    let nums: Vec<i32> = serde_json::from_str(&line).unwrap_or(vec![]);
    let target: i32 = lines.next().unwrap().unwrap().parse().unwrap();
    let result = two_sum(nums, target);
    println!("{:?}", result);
}`,
      ruby: `def two_sum(nums, target)
    # your code here
end

nums = eval(gets.chomp)
target = gets.to_i
puts two_sum(nums, target).inspect`,
      php: `<?php
function twoSum($nums, $target) {
    // your code here
    return [];
}

$nums = json_decode(trim(fgets(STDIN)));
$target = intval(trim(fgets(STDIN)));
echo json_encode(twoSum($nums, $target)) . "\\n";
?>`,
      csharp: `using System;
using System.Linq;

class Program {
    static int[] TwoSum(int[] nums, int target) {
        // your code here
        return new int[]{};
    }

    static void Main() {
        string line = Console.ReadLine();
        line = line.Trim('[', ']');
        int[] nums = line.Split(',').Select(int.Parse).ToArray();
        int target = int.Parse(Console.ReadLine());
        int[] result = TwoSum(nums, target);
        Console.WriteLine($"[{result[0]},{result[1]}]");
    }
}`,
      kotlin: `fun twoSum(nums: IntArray, target: Int): IntArray {
    // your code here
    return intArrayOf()
}

fun main() {
    val line = readLine()!!.trim('[', ']')
    val nums = line.split(",").map { it.trim().toInt() }.toIntArray()
    val target = readLine()!!.toInt()
    val result = twoSum(nums, target)
    println("[" + result.joinToString(",") + "]")
}`,
      swift: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    // your code here
    return []
}

if let line = readLine() {
    let nums = line.dropFirst().dropLast().split(separator: ",").map { Int($0.trimmingCharacters(in: .whitespaces))! }
    if let targetLine = readLine(), let target = Int(targetLine) {
        let result = twoSum(nums, target)
        print("[\\(result[0]),\\(result[1])]")
    }
}`,
      bash: `# read input
read nums_str
read target

# your code here - parse and solve
echo "[0,1]"`
    }
  },
  {
    id: 2,
    title: 'Palindrome Number',
    difficulty: 'easy',
    description: `<p>Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>`,
    examples: [
      { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' },
      { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.' },
      { input: 'x = 10', output: 'false', explanation: 'Reads 01 from right to left.' }
    ],
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    testCases: [
      { input: '121', expected: 'true' },
      { input: '-121', expected: 'false' },
      { input: '10', expected: 'false' },
      { input: '12321', expected: 'true' }
    ],
    starterCode: {
      python: `def is_palindrome(x):
    # your code here
    pass

x = int(input())
print(str(is_palindrome(x)).lower())`,
      javascript: `function isPalindrome(x) {
    // your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
    console.log(isPalindrome(parseInt(line)));
    rl.close();
});`,
      typescript: `function isPalindrome(x: number): boolean {
    // your code here
    return false;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line: string) => {
    console.log(isPalindrome(parseInt(line)));
    rl.close();
});`,
      cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    // your code here
    return false;
}

int main() {
    int x;
    cin >> x;
    cout << (isPalindrome(x) ? "true" : "false") << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>

bool isPalindrome(int x) {
    // your code here
    return false;
}

int main() {
    int x;
    scanf("%d", &x);
    printf("%s\\n", isPalindrome(x) ? "true" : "false");
    return 0;
}`,
      java: `import java.util.Scanner;

public class Main {
    public static boolean isPalindrome(int x) {
        // your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(isPalindrome(x));
    }
}`,
      go: `package main

import "fmt"

func isPalindrome(x int) bool {
    // your code here
    return false
}

func main() {
    var x int
    fmt.Scan(&x)
    fmt.Println(isPalindrome(x))
}`,
      rust: `use std::io;

fn is_palindrome(x: i32) -> bool {
    // your code here
    false
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let x: i32 = input.trim().parse().unwrap();
    println!("{}", is_palindrome(x));
}`,
      ruby: `def is_palindrome(x)
    # your code here
    false
end

x = gets.to_i
puts is_palindrome(x)`,
      php: `<?php
function isPalindrome($x) {
    // your code here
    return false;
}

$x = intval(trim(fgets(STDIN)));
echo isPalindrome($x) ? "true" : "false";
echo "\\n";
?>`,
      csharp: `using System;

class Program {
    static bool IsPalindrome(int x) {
        // your code here
        return false;
    }

    static void Main() {
        int x = int.Parse(Console.ReadLine());
        Console.WriteLine(IsPalindrome(x).ToString().ToLower());
    }
}`,
      kotlin: `fun isPalindrome(x: Int): Boolean {
    // your code here
    return false
}

fun main() {
    val x = readLine()!!.toInt()
    println(isPalindrome(x))
}`,
      swift: `func isPalindrome(_ x: Int) -> Bool {
    // your code here
    return false
}

if let line = readLine(), let x = Int(line) {
    print(isPalindrome(x))
}`,
      bash: `read x
# your code here
echo "false"`
    }
  },
  {
    id: 3,
    title: 'FizzBuzz',
    difficulty: 'easy',
    description: `<p>Given an integer <code>n</code>, return a string array <code>answer</code> (1-indexed) where:</p>
      <ul style="margin: 12px 0 12px 20px;">
        <li><code>answer[i] == "FizzBuzz"</code> if <code>i</code> is divisible by 3 and 5.</li>
        <li><code>answer[i] == "Fizz"</code> if <code>i</code> is divisible by 3.</li>
        <li><code>answer[i] == "Buzz"</code> if <code>i</code> is divisible by 5.</li>
        <li><code>answer[i] == i</code> (as a string) if none of the above conditions are true.</li>
      </ul>`,
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ],
    constraints: ['1 <= n <= 10^4'],
    testCases: [
      { input: '3', expected: '["1","2","Fizz"]' },
      { input: '5', expected: '["1","2","Fizz","4","Buzz"]' },
      { input: '15', expected: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ],
    starterCode: {
      python: `def fizz_buzz(n):
    # your code here
    pass

n = int(input())
import json
print(json.dumps(fizz_buzz(n)))`,
      javascript: `function fizzBuzz(n) {
    // your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
    console.log(JSON.stringify(fizzBuzz(parseInt(line))));
    rl.close();
});`,
      typescript: `function fizzBuzz(n: number): string[] {
    // your code here
    return [];
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line: string) => {
    console.log(JSON.stringify(fizzBuzz(parseInt(line))));
    rl.close();
});`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> fizzBuzz(int n) {
    // your code here
    return {};
}

int main() {
    int n;
    cin >> n;
    auto result = fizzBuzz(n);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << "\\"" << result[i] << "\\"";
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char** fizzBuzz(int n, int* returnSize) {
    // your code here
    *returnSize = n;
    char** result = malloc(n * sizeof(char*));
    return result;
}

int main() {
    int n;
    scanf("%d", &n);
    int size;
    char** result = fizzBuzz(n, &size);
    printf("[");
    for(int i=0; i<size; i++) {
        printf("\\"%s\\"", result[i]);
        if(i < size-1) printf(",");
    }
    printf("]\\n");
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static List<String> fizzBuzz(int n) {
        // your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<String> result = fizzBuzz(n);
        System.out.print("[");
        for(int i=0; i<result.size(); i++) {
            System.out.print("\\"" + result.get(i) + "\\"");
            if(i < result.size()-1) System.out.print(",");
        }
        System.out.println("]");
    }
}`,
      go: `package main

import (
    "fmt"
    "strings"
)

func fizzBuzz(n int) []string {
    // your code here
    return []string{}
}

func main() {
    var n int
    fmt.Scan(&n)
    result := fizzBuzz(n)
    parts := make([]string, len(result))
    for i, s := range result {
        parts[i] = "\\"" + s + "\\""
    }
    fmt.Println("[" + strings.Join(parts, ",") + "]")
}`,
      rust: `use std::io;

fn fizz_buzz(n: i32) -> Vec<String> {
    // your code here
    vec![]
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();
    let result = fizz_buzz(n);
    let parts: Vec<String> = result.iter().map(|s| format!("\\"{}\\"", s)).collect();
    println!("[{}]", parts.join(","));
}`,
      ruby: `def fizz_buzz(n)
    # your code here
    []
end

n = gets.to_i
result = fizz_buzz(n)
puts '["' + result.join('","') + '"]'`,
      php: `<?php
function fizzBuzz($n) {
    // your code here
    return [];
}

$n = intval(trim(fgets(STDIN)));
echo json_encode(fizzBuzz($n)) . "\\n";
?>`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static List<string> FizzBuzz(int n) {
        // your code here
        return new List<string>();
    }

    static void Main() {
        int n = int.Parse(Console.ReadLine());
        var result = FizzBuzz(n);
        Console.WriteLine("[\\"" + string.Join("\\",\\"", result) + "\\"]");
    }
}`,
      kotlin: `fun fizzBuzz(n: Int): List<String> {
    // your code here
    return listOf()
}

fun main() {
    val n = readLine()!!.toInt()
    val result = fizzBuzz(n)
    println("[\\"" + result.joinToString("\\",\\"") + "\\"]")
}`,
      swift: `func fizzBuzz(_ n: Int) -> [String] {
    // your code here
    return []
}

if let line = readLine(), let n = Int(line) {
    let result = fizzBuzz(n)
    print("[\\"" + result.joined(separator: "\\",\\"") + "\\"]")
}`,
      bash: `read n
# your code here
echo '["1","2","Fizz"]'`
    }
  },
  {
    id: 4,
    title: 'Reverse String',
    difficulty: 'easy',
    description: `<p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
      <p>You must do this by modifying the input array in-place with O(1) extra memory.</p>`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character'],
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
      { input: '["a"]', expected: '["a"]' }
    ],
    starterCode: {
      python: `def reverse_string(s):
    # your code here - modify s in place
    pass

import json
s = json.loads(input())
reverse_string(s)
print(json.dumps(s))`,
      javascript: `function reverseString(s) {
    // your code here - modify s in place
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
    const s = JSON.parse(line);
    reverseString(s);
    console.log(JSON.stringify(s));
    rl.close();
});`,
      typescript: `function reverseString(s: string[]): void {
    // your code here - modify s in place
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line: string) => {
    const s = JSON.parse(line);
    reverseString(s);
    console.log(JSON.stringify(s));
    rl.close();
});`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void reverseString(vector<char>& s) {
    // your code here
}

int main() {
    string line;
    getline(cin, line);
    vector<char> s;
    // parse ["h","e","l","l","o"]
    for(int i=0; i<line.size(); i++) {
        if(line[i] == '"' && i+1 < line.size() && line[i+2] == '"') {
            s.push_back(line[i+1]);
        }
    }
    reverseString(s);
    cout << "[";
    for(int i=0; i<s.size(); i++) {
        cout << "\\"" << s[i] << "\\"";
        if(i < s.size()-1) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

void reverseString(char* s, int sSize) {
    // your code here
}

int main() {
    char line[100001];
    fgets(line, sizeof(line), stdin);

    // parse ["h","e","l","l","o"]
    char s[100000];
    int size = 0;
    char* p = line;
    while (*p) {
        if (*p == '"' && *(p+1) && *(p+2) == '"') {
            s[size++] = *(p+1);
            p += 3;
        } else {
            p++;
        }
    }

    reverseString(s, size);

    printf("[");
    for(int i=0; i<size; i++) {
        printf("\\"%c\\"", s[i]);
        if(i < size-1) printf(",");
    }
    printf("]\\n");
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static void reverseString(char[] s) {
        // your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        // parse ["h","e","l","l","o"]
        List<Character> list = new ArrayList<>();
        for(int i=0; i<line.length(); i++) {
            if(line.charAt(i) == '"' && i+2 < line.length() && line.charAt(i+2) == '"') {
                list.add(line.charAt(i+1));
            }
        }
        char[] s = new char[list.size()];
        for(int i=0; i<list.size(); i++) s[i] = list.get(i);
        reverseString(s);
        System.out.print("[");
        for(int i=0; i<s.length; i++) {
            System.out.print("\\"" + s[i] + "\\"");
            if(i < s.length-1) System.out.print(",");
        }
        System.out.println("]");
    }
}`,
      go: `package main

import (
    "fmt"
    "encoding/json"
    "bufio"
    "os"
)

func reverseString(s []byte) {
    // your code here
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    line, _ := reader.ReadString('\\n')
    var chars []string
    json.Unmarshal([]byte(line), &chars)
    s := make([]byte, len(chars))
    for i, c := range chars { s[i] = c[0] }
    reverseString(s)
    result := make([]string, len(s))
    for i, c := range s { result[i] = string(c) }
    out, _ := json.Marshal(result)
    fmt.Println(string(out))
}`,
      rust: `use std::io;

fn reverse_string(s: &mut Vec<char>) {
    // your code here
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    // parse ["h","e","l","l","o"]
    let mut s: Vec<char> = Vec::new();
    let mut chars = input.chars().peekable();
    while let Some(c) = chars.next() {
        if c == '"' {
            if let Some(ch) = chars.next() {
                if ch != '"' {
                    s.push(ch);
                }
            }
        }
    }
    reverse_string(&mut s);
    let parts: Vec<String> = s.iter().map(|c| format!("\\"{}\\"", c)).collect();
    println!("[{}]", parts.join(","));
}`,
      ruby: `def reverse_string(s)
    # your code here - modify s in place
end

require 'json'
s = JSON.parse(gets.chomp)
reverse_string(s)
puts s.to_json`,
      php: `<?php
function reverseString(&$s) {
    // your code here - modify s in place
}

$s = json_decode(trim(fgets(STDIN)));
reverseString($s);
echo json_encode($s) . "\\n";
?>`,
      csharp: `using System;
using System.Text.Json;

class Program {
    static void ReverseString(char[] s) {
        // your code here
    }

    static void Main() {
        string line = Console.ReadLine();
        var chars = JsonSerializer.Deserialize<string[]>(line);
        char[] s = new char[chars.Length];
        for(int i=0; i<chars.Length; i++) s[i] = chars[i][0];
        ReverseString(s);
        Console.Write("[");
        for(int i=0; i<s.Length; i++) {
            Console.Write("\\"" + s[i] + "\\"");
            if(i < s.Length-1) Console.Write(",");
        }
        Console.WriteLine("]");
    }
}`,
      kotlin: `fun reverseString(s: CharArray): Unit {
    // your code here
}

fun main() {
    val line = readLine()!!
    // parse ["h","e","l","l","o"]
    val regex = "\\"(.)\\"".toRegex()
    val chars = regex.findAll(line).map { it.groupValues[1][0] }.toList().toCharArray()
    reverseString(chars)
    println("[\\"" + chars.joinToString("\\",\\"") + "\\"]")
}`,
      swift: `func reverseString(_ s: inout [Character]) {
    // your code here
}

if let line = readLine() {
    // parse ["h","e","l","l","o"]
    var s: [Character] = []
    var i = line.startIndex
    while i < line.endIndex {
        if line[i] == "\\"" {
            let next = line.index(after: i)
            if next < line.endIndex {
                let nextNext = line.index(after: next)
                if nextNext < line.endIndex && line[nextNext] == "\\"" {
                    s.append(line[next])
                    i = line.index(after: nextNext)
                    continue
                }
            }
        }
        i = line.index(after: i)
    }
    reverseString(&s)
    print("[\\"" + s.map{String($0)}.joined(separator: "\\",\\"") + "\\"]")
}`,
      bash: `read input
# your code here
echo '["o","l","l","e","h"]'`
    }
  },
  {
    id: 5,
    title: 'Valid Parentheses',
    difficulty: 'easy',
    description: `<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
      <p>An input string is valid if:</p>
      <ul style="margin: 12px 0 12px 20px;">
        <li>Open brackets must be closed by the same type of brackets.</li>
        <li>Open brackets must be closed in the correct order.</li>
        <li>Every close bracket has a corresponding open bracket of the same type.</li>
      </ul>`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only'],
    testCases: [
      { input: '()', expected: 'true' },
      { input: '()[]{}', expected: 'true' },
      { input: '(]', expected: 'false' },
      { input: '([)]', expected: 'false' },
      { input: '{[]}', expected: 'true' }
    ],
    starterCode: {
      python: `def is_valid(s):
    # your code here
    pass

s = input()
print(str(is_valid(s)).lower())`,
      javascript: `function isValid(s) {
    // your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
    console.log(isValid(line));
    rl.close();
});`,
      typescript: `function isValid(s: string): boolean {
    // your code here
    return false;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line: string) => {
    console.log(isValid(line));
    rl.close();
});`,
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    // your code here
    return false;
}

int main() {
    string s;
    cin >> s;
    cout << (isValid(s) ? "true" : "false") << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    // your code here
    return false;
}

int main() {
    char s[10001];
    scanf("%s", s);
    printf("%s\\n", isValid(s) ? "true" : "false");
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        // your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isValid(s));
    }
}`,
      go: `package main

import (
    "fmt"
    "bufio"
    "os"
)

func isValid(s string) bool {
    // your code here
    return false
}

func main() {
    reader := bufio.NewReader(os.Stdin)
    s, _ := reader.ReadString('\\n')
    s = s[:len(s)-1] // remove newline
    fmt.Println(isValid(s))
}`,
      rust: `use std::io;

fn is_valid(s: String) -> bool {
    // your code here
    false
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    println!("{}", is_valid(input.trim().to_string()));
}`,
      ruby: `def is_valid(s)
    # your code here
    false
end

s = gets.chomp
puts is_valid(s)`,
      php: `<?php
function isValid($s) {
    // your code here
    return false;
}

$s = trim(fgets(STDIN));
echo isValid($s) ? "true" : "false";
echo "\\n";
?>`,
      csharp: `using System;
using System.Collections.Generic;

class Program {
    static bool IsValid(string s) {
        // your code here
        return false;
    }

    static void Main() {
        string s = Console.ReadLine();
        Console.WriteLine(IsValid(s).ToString().ToLower());
    }
}`,
      kotlin: `fun isValid(s: String): Boolean {
    // your code here
    return false
}

fun main() {
    val s = readLine()!!
    println(isValid(s))
}`,
      swift: `func isValid(_ s: String) -> Bool {
    // your code here
    return false
}

if let line = readLine() {
    print(isValid(line))
}`,
      bash: `read s
# your code here
echo "false"`
    }
  }
];

// all languages judge0 supports (the main ones)
const LANG_MAP = {
  python: { id: 71, monaco: 'python', name: 'Python 3' },
  javascript: { id: 63, monaco: 'javascript', name: 'JavaScript' },
  typescript: { id: 74, monaco: 'typescript', name: 'TypeScript' },
  cpp: { id: 54, monaco: 'cpp', name: 'C++' },
  c: { id: 50, monaco: 'c', name: 'C' },
  java: { id: 62, monaco: 'java', name: 'Java' },
  go: { id: 60, monaco: 'go', name: 'Go' },
  rust: { id: 73, monaco: 'rust', name: 'Rust' },
  ruby: { id: 72, monaco: 'ruby', name: 'Ruby' },
  php: { id: 68, monaco: 'php', name: 'PHP' },
  csharp: { id: 51, monaco: 'csharp', name: 'C#' },
  kotlin: { id: 78, monaco: 'kotlin', name: 'Kotlin' },
  swift: { id: 83, monaco: 'swift', name: 'Swift' },
  bash: { id: 46, monaco: 'shell', name: 'Bash' }
};
