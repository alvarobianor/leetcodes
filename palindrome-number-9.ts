/*
Given an integer x, return true if x is a palindrome, and false otherwise.

 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 

Constraints:

-231 <= x <= 231 - 1
 

Follow up: Could you solve it without converting the integer to a string?
*/

function isPalindrome(number: number): boolean {
  if (number < -(2 ** 31) || number > 2 ** 31 - 1) {
    return false;
  }

  let invertedNumber = 0;
  let startNumber = number;

  while (startNumber > 0) {
    const rest = Math.floor(startNumber % 10);

    invertedNumber = invertedNumber * 10 + rest;

    startNumber = Math.floor(startNumber / 10);
  }

  return invertedNumber === number;
}

console.log(isPalindrome(122)); // false
console.log(isPalindrome(12121)); // true
console.log(isPalindrome(-121)); // false

// My submission: https://leetcode.com/problems/palindrome-number/submissions/1962260553
