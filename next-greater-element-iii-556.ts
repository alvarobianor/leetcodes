// Given a positive integer n, find the smallest integer which has exactly the same digits existing in the integer n and is greater in value than n. If no such positive integer exists, return -1.

// Note that the returned integer should fit in 32-bit integer, if there is a valid answer but it does not fit in 32-bit integer, return -1.

// Example 1:

// Input: n = 12
// Output: 21
// Example 2:

// Input: n = 21
// Output: -1

// Constraints:

// 1 <= n <= 231 - 1

function nextGreaterElement(n: number): number {
  if (n <= 9 || n > 2 ** 31 - 1) return -1;

  let iterator = n;

  const list: number[] = [];

  while (iterator > 0) {
    const number = iterator % 10;
    list.push(number);
    iterator = Math.floor(iterator / 10);
  }

  const sortedList = list.sort((a, b) => a - b);

  let result = parseInt([...sortedList].join(""));

  if (result < n) {
    return -1;
  }

  if (result === n) {
    let last = sortedList.pop();
    let index = sortedList.length - 1;

    while (index >= 0 && last != undefined) {
      if (sortedList[index] < last) {
        return parseInt(
          [
            ...sortedList.slice(0, index),
            last,
            ...sortedList.slice(index, sortedList.length),
          ].join(""),
        );
      }
      index--;
    }
    return -1;
  }

  return result;
}

const n = 1111;

console.log(`number -> ${n} nextGreaterElement ->${nextGreaterElement(n)}`);

// const lll = [0, 1, 2, 3, 4, 5, 6, 7];
// const number = lll.pop();

// console.log([...lll.slice(0, 3), number, ...lll.slice(3, lll.length)]);
