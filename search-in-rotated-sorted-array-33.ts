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
  if (nums.length < 1 && nums.length > 5000) {
    return -1;
  }

  return -1;
}

// console.log(search([3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2], 0));
console.log(search([9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8], 1));
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
