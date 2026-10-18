# 287. Find the Duplicate Number

**Difficulty:** Medium · **Topic:** Arrays

## Description

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and using only constant extra space.

### Constraints

- `1 <= n <= 105`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
- All the integers in nums appear only once except for precisely one integer which appears two or more times.

### Examples

```text
Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
Example 3:

Input: nums = [3,3,3,3,3]
Output: 3
```

### Follow up

- How can we prove that at least one duplicate number must exist in nums?
- Can you solve the problem in linear runtime complexity?

### Links

- [Interview Bit: Find Duplicate in Array](https://www.interviewbit.com/problems/find-duplicate-in-array/)
- [Leetcode: 287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/description/)

## Prequisites

- **Pigeonhole principle** - The array has `n + 1` entries but only `n` possible
  values, so some value must repeat. This is also the answer to the problem's
  follow-up about why a duplicate must exist. The principle also works inside a
  group of values: if a group can hold `g` distinct values and receives more
  than `g` entries, some value in that group repeats.
- **Bucketing** - Group values into ranges and count per range instead of per value.
- **Cycle detection (two pointers)** - [Idea or pattern to look out for]

## Solution 1 (Least Optimal)

No code file. This is the obvious approach the other solutions improve on.

### Solution 1 Intuition

Keep one counter for each value from `1` to `n`, and return the first value
whose counter reaches two.

### Solution 1 Examples & Psuedocode

[Write the pseudocode.]

### Solution 1 Complexity

- **Time:** **O(n)**
- **Space:** **O(n)**, because it needs about `n` counters, which breaks the
  constant-space rule.

## Solution 2 (More Optimal)

**Code:** [solutions/bucket.ts](solutions/bucket.ts)

### Solution 2 Intuition

A bucket is a range of values, grouped by the **number's value**, not by its position in the array.

If each bucket holds `b` values, then:

- The first pass needs one counter per bucket, or about `n / b` counters.
- The second pass needs one counter per value in the crowded bucket, or at most `b` counters.

To balance the two costs, set them about equal: `n / b ≈ b`, so `b ≈ √n`. That keeps the extra space at **O(√n)**.

### Solution 2 Examples & Psuedocode

For `n = 8`, `√n ≈ 2.83`. Use a bucket size of `2`, which gives four buckets:

| Bucket | Values it can contain |
| --- | --- |
| 1 | `1, 2` |
| 2 | `3, 4` |
| 3 | `5, 6` |
| 4 | `7, 8` |

**First pass: find a crowded bucket.** Consider `[2, 7, 4, 3, 4, 1, 8, 6, 5]`. Its values are `1` through `8`, so use the four buckets above.

- `2` and `1` go in the `1, 2` bucket: count `2`.
- `4`, `3`, and `4` go in the `3, 4` bucket: count `3`.
- `6` and `5` go in the `5, 6` bucket: count `2`.
- `7` and `8` go in the `7, 8` bucket: count `2`.

The `3, 4` bucket can hold only two distinct values, but three entries landed there. So at least one of those entries is a duplicate. The other buckets received no more entries than they can hold, so they don't prove anything.

**Second pass: find the duplicate in that bucket.** Look only at values from `3` through `4`, and count each one:

- `3` appears once.
- `4` appears twice.

So the repeated value is `4`. We only need counters for the values in this one bucket.

[Write the pseudocode.]

### Solution 2 Complexity

- **Time:** **O(n)**, because each pass scans the array once.
- **Space:** **O(√n)**, because there is one counter per bucket and up to `√n` counters for the crowded bucket.

This meets the "don't modify the array" rule, but it uses more than constant space.

## Solution 3 (Most Optimal)

**Code:** [solutions/2pointer.ts](solutions/2pointer.ts)

### Solution 3 Intuition

[Explain the cycle-detection idea: why treating values as pointers to the next
index creates a cycle, and why the cycle's entry point is the duplicate.]

### Solution 3 Examples & Psuedocode

[Give a small example and write the pseudocode.]

### Solution 3 Complexity

- **Time:** **O([...])**
- **Space:** **O(1)**

## Common Mistakes

[Explanation of common mistakes potentially made while coding.]
