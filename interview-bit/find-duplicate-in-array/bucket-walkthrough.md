# Walkthrough

## Why not count every number?

A direct way to find a duplicate is to keep a counter for every possible value. As we read the array, we increase the counter for each value; a counter reaching two tells us that value has appeared before.

There can be about `n` possible values, so this approach needs about **O(n)** extra space. The problem asks for less than **O(n)** space, so we need to store less information.

## The key observation

The given array has `n + 1` values, and each value is between `1` and `n`. There are only `n` different values available, but the array contains `n + 1` entries. By the **pigeonhole principle**, at least one value must repeat.

The pigeonhole principle also works within a smaller group: if more entries fall into a group than there are possible values in that group, some value in the group must repeat.

## What is a bucket?

A bucket is just a group of values in a range. It groups by the **number's value**, not by where the number appears in the array.

We choose the bucket size to balance two amounts of space. If each bucket holds `b` values, then:

- The first pass needs one counter per bucket, or about `n / b` counters.
- The second pass needs one counter per possible value in the crowded bucket, or at most `b` counters.

If `b` is too small, there are many buckets to count. If `b` is too large, the crowded bucket needs many individual counters. To balance the two costs, set them about equal: `n / b ≈ b`. Solving gives `b ≈ √n`. This choice makes both the number of buckets and the number of values in a bucket about `√n`, keeping the extra space to **O(√n)**.

For the example below, `n = 8`, so `√n ≈ 2.83`. We use an integer bucket size of `2`, giving four buckets:

| Bucket | Values it can contain |
| --- | --- |
| 1 | `1, 2` |
| 2 | `3, 4` |
| 3 | `5, 6` |
| 4 | `7, 8` |

Each bucket needs just one counter. When we see a value, we figure out which range contains it and increase that bucket's counter. We do not yet count each individual value.

## First pass: find a crowded bucket

Consider the array `[2, 7, 4, 3, 4, 1, 8, 6, 5]`. Its values are in the range `1` through `8`, so use the four buckets above.

- `2` and `1` go in the `1, 2` bucket: count `2`.
- `4`, `3`, and `4` go in the `3, 4` bucket: count `3`.
- `6` and `5` go in the `5, 6` bucket: count `2`.
- `7` and `8` go in the `7, 8` bucket: count `2`.

The `3, 4` bucket can hold only two distinct values: `3` and `4`. But three array entries landed there. Therefore, at least one of those entries must be a duplicate. The other buckets each received no more entries than their ranges can hold, so they do not establish a duplicate.

## Second pass: find the duplicate in that bucket

Now look only at values from the crowded bucket, `3` through `4`. Count those values individually:

- `3` appears once.
- `4` appears twice.

So the repeated value is `4`. We only need counters for the values in this one bucket, rather than counters for every possible value.

## Why this meets the constraints

Each pass scans the input array once, so the total running time is **O(n)**, and the array is traversed twice.

The stated `n + 1` entries in `1..n` condition guarantees a duplicate. Some examples in the problem statement show an array with no duplicate, which does not satisfy that condition. The implementation returns `-1` if it finds no duplicate, but that outcome is only possible for inputs outside the stated guarantee.
