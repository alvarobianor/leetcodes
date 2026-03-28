/*Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".


Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters if it is non-empty.

https://leetcode.com/problems/longest-common-prefix/description/?envType=problem-list-v2&envId=array

*/

function longestCommonPrefix(strs: string[]): string {
  if (strs.length < 1 || strs.length > 200) return "";

  let wordWithMinLength = strs[0];

  let preffix = strs[0];

  strs.forEach((word) => {
    if (word.length <= 0 || word.length > 200) {
      return "";
    }

    if (word.length < wordWithMinLength.length) {
      wordWithMinLength = word;
    }
  });

  strs.forEach((word) => {
    if (word != wordWithMinLength) {
      let letters = "";
      for (let i = 0; i < wordWithMinLength.length; i++) {
        if (wordWithMinLength[i] === word[i]) {
          letters += wordWithMinLength[i];
        } else {
          break;
        }
      }
      if (letters.length < preffix.length) {
        preffix = letters;
      }
    }
  });

  return preffix;
}

console.log(
  "Out 1: ",
  longestCommonPrefix(["flower", "finale", "flow", "flight", "flame", "found"]),
);
console.log("Out 2: ", longestCommonPrefix(["dog", "racecar", "car"]));
console.log("Out 3: ", longestCommonPrefix(["car", "cir"]));

// My submission: https://leetcode.com/problems/longest-common-prefix/submissions/1959971493/?envType=problem-list-v2&envId=array

/*
Good Solution:

function longestCommonPrefix(strs: string[]): string {
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        const currentWord = strs[i];

        while (!currentWord.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);

            if (prefix === "") return "";
        }
    }

    return prefix;
}
*/
