# Walkthrough

> **Pattern:** Pigeonhole principle, bucketing. This approach uses more than constant space, so it is a stepping stone, not the final answer. See `solutions/2pointer.ts` for the constant-space solution.

## What is the problem really asking?

Given `nums` with `n + 1` integers, each between `1` and `n`, return the one value that appears two or more times. You must not modify `nums`, and you may use only constant extra space.

## Why not count every number?

Keep one counter for each value from `1` to `n`, and return the first value whose counter reaches two. This needs about `n` counters, which is `O(n)` extra space and breaks the constant-space rule.

## The key observation

The array has `n + 1` entries but only `n` possible values, so by the **pigeonhole principle** some value must repeat. This is also the answer to the problem's follow-up about why a duplicate must exist.

The principle also works inside a group of values. If a group can hold `g` distinct values and receives more than `g` entries, some value in that group repeats.

## What is a bucket?

A bucket is a range of values, grouped by the **number's value**, not by its position in the array.

If each bucket holds `b` values, then:

- The first pass needs one counter per bucket, or about `n / b` counters.
- The second pass needs one counter per value in the crowded bucket, or at most `b` counters.

To balance the two costs, set them about equal: `n / b ≈ b`, so `b ≈ √n`. That keeps the extra space at **O(√n)**.

For `n = 8`, `√n ≈ 2.83`. Use a bucket size of `2`, which gives four buckets:

| Bucket | Values it can contain |
| --- | --- |
| 1 | `1, 2` |
| 2 | `3, 4` |
| 3 | `5, 6` |
| 4 | `7, 8` |

## First pass: find a crowded bucket

Consider `[2, 7, 4, 3, 4, 1, 8, 6, 5]`. Its values are `1` through `8`, so use the four buckets above.

- `2` and `1` go in the `1, 2` bucket: count `2`.
- `4`, `3`, and `4` go in the `3, 4` bucket: count `3`.
- `6` and `5` go in the `5, 6` bucket: count `2`.
- `7` and `8` go in the `7, 8` bucket: count `2`.

The `3, 4` bucket can hold only two distinct values, but three entries landed there. So at least one of those entries is a duplicate. The other buckets received no more entries than they can hold, so they don't prove anything.

## Second pass: find the duplicate in that bucket

Look only at values from `3` through `4`, and count each one:

- `3` appears once.
- `4` appears twice.

So the repeated value is `4`. We only need counters for the values in this one bucket.

## Complexity

- **Time:** **O(n)**, because each pass scans the array once.
- **Space:** **O(√n)**, because there is one counter per bucket and up to `√n` counters for the crowded bucket.

This meets the "don't modify the array" rule, but it uses more than constant space. The two-pointer cycle method in `solutions/2pointer.ts` uses **O(1)** space and is the answer to the follow-up.
