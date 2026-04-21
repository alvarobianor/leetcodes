// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"

// Output: true

// Example 2:

// Input: s = "()[]{}"

// Output: true

// Example 3:

// Input: s = "(]"

// Output: false

// Example 4:

// Input: s = "([])"

// Output: true

// Example 5:

// Input: s = "([)]"

// Output: false

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

function isValid(s: string): boolean {
  if (s.length <= 1 || s.length >= 100000) {
    return false;
  }

  const ob = ["(", "[", "{"];
  const cb = [")", "]", "}"];

  const openBrackets: string[] = [];

  for (const ele of s) {
    if (ob.includes(ele)) {
      openBrackets.push(ele);
      continue;
    }
    if (cb.includes(ele)) {
      const result = `${openBrackets[openBrackets.length - 1]}${ele}`;

      if (result !== "()" && result !== "[]" && result !== "{}") {
        return false;
      }

      openBrackets.pop();
    }
  }

  if (openBrackets.length > 0) {
    return false;
  }

  return true;
}

const s = "([[[]{}]])";

console.log(`string -> ${s} || result -> ${isValid(s)}`);

// link of leetcode -> https://leetcode.com/problems/valid-parentheses/
