// There is an integer array nums sorted in ascending order (with distinct values).

// Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

// Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
// Example 2:

// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
// Example 3:

// Input: nums = [1], target = 0
// Output: -1

// Constraints:

// 1 <= nums.length <= 5000
// -104 <= nums[i] <= 104
// All values of nums are unique.
// nums is an ascending array that is possibly rotated.
// -104 <= target <= 104

function search(nums: number[], target: number): number {
  let position = -1;
  if (nums.length < 1 && nums.length > 5000) {
    return position;
  }

  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (target == nums[mid]) {
      console.log(`found -> ${mid} target -> ${target}`);
      return mid;
    }

    console.log(
      `------------------------------------------------------------------------------------------------------------------------------------------------------\nAi o array -> ${nums.slice(l, r + 1)} -> l = ${nums[l]}, mid = ${nums[mid]}, r = ${nums[r]} ||| target = ${target}\n------------------------------------------------------------------------------------------------------------------------------------------------------`,
    );

    if (nums[mid] < nums[l]) {
      if (target < nums[mid] || target >= nums[l]) {
        r = mid - 1;
        console.log("1:1");
      } else {
        l = mid + 1;
        console.log("1:2");
      }
    } else {
      if (target > nums[mid] || (target <= nums[r] && target < nums[l])) {
        l = mid + 1;
        console.log("2:1");
      } else {
        r = mid - 1;
        console.log("2:2");
      }
    }
  }

  console.log(`not found -> ${target}`);
  return position;
}

// console.log(search([3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2], 0));

const nums = [2, 3, 4, 5, 6, 0, 1];
let success = true;
for (const num in nums) {
  const result = search(nums, Number(num));
  if (result === -1) {
    success = false;
  }
}

console.log(success);

// console.log(search([2, 3, 4, 5, 6, 0, 1], 0));

// function search(nums: number[], target: number): number {
//   if (nums.length < 1 && nums.length > 5000) {
//     return -1;
//   }

//   let values = nums;
//   let position = -2;
//   let rest = 0;

//   while (position == -2) {
//     if (values.length == 0) {
//       position = -1;
//     }

//     let mid = Math.floor(values.length / 2);
//     console.log(
//       "values -> ",
//       values,
//       "mid -> ",
//       values[mid],
//       "target -> ",
//       target,
//     );

//     if (target == values[mid]) {
//       position = mid + rest;
//     }

//     let left = 0;

//     let right = values.length - 1;

//     if (values[0] <= values[mid] && values[mid] <= target) {
//       values = values.slice(left, mid);
//     } else if (values[mid] <= values[right] && values[mid] <= target) {
//       values = values.slice(left, mid);
//     } else if (values[mid] <= values[right] && values[mid] > target) {
//       values = values.slice(left, mid);
//     } else {
//       values = values.slice(mid, right);
//       rest += mid;
//     }
//   }

//   return position;
// }
