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

  const ob1 = "(";
  const ob2 = "[";
  const ob3 = "{";
  const cb1 = ")";
  const cb2 = "]";
  const cb3 = "}";

  const openBrackets: string[] = [];
  const closeBrackets: string[] = [];

  for (const ele of s) {
    if (ele === ob1 || ele === ob2 || ele === ob3) {
      openBrackets.push(ele);
      continue;
    }
    if (ele === cb1 || ele === cb2 || ele === cb3) {
      closeBrackets.push(ele);
    }
  }

  if (openBrackets.length !== closeBrackets.length) {
    return false;
  }

  console.log(`OB -> ${openBrackets} || CB -> ${closeBrackets}`);

  for (let i = openBrackets.length - 1; i > 0; i--) {
    const result = `${openBrackets[i]}${closeBrackets[i]}`;

    console.log(`result -> ${result} || i -> ${i}`);

    if (result !== "()" && result !== "[]" && result !== "{}") {
      return false;
    }
  }

  return true;
}
const s = "()[[]]";

console.log(`string -> ${s} || result -> ${isValid(s)}`);
