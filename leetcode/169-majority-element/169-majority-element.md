# Majority Element

## Description

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may
assume that the majority element always exists in the array.

```text
Example 1:

Input: nums = [3,2,3]
Output: 3
```

```text
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

Constraints:

- `n == nums.length`
- `1 <= n <= 5 * 104`
- `-109 <= nums[i] <= 109`
- The input is generated such that a majority element will exist in the array.

\
Follow-up: Could you solve the problem in linear time and in O(1) space?

## Solution 1: Map

The most straight forward way is to count how many times each number has been seen.
Return the number as soon as itappears greater than `n/2` times. No need to always
check through the entire array because a **majority element** is guarenteed there.

Complexity:

- Space: `O(n)`
- Time: `O(n)`

This is the easiest way to solve this problem. How can we use constant space?

## Solution 2: Sorting

If you sort the array, the majority element always ends up at `nums[n/2]`.

It always ends up there because there are always at least `(n/2)+1` indexes of
the majority number. If it is the smallest number in the array, then it will be
a block from index `0` to `n/2`. If it is the biggest number, the block will start
from index `n/2` to the end.

Complexity:

- Space: `O(1)`
- Time: `O(log(n))`

## Solution 3: Boyers-Moore Voting

Robert S. Boyer and J Strother Moore published a clever solution to the majority
element problem. It uses a candidate variable and a counter (initialized to 0),
therefore only using constant space. The rule is simple. Traverse the array. If
the count is 0, make the current element the candidate. If the current element
and the candidate are equal, then increment the count by one. If they aren't,
then decrement by 1. At the end, the majority vote is the candidate.

If the problem guarentees there is a majority element, then use the single pass.
If not, then a second pass is needed to make sure the `count > n / 2`
