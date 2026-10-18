# Find Duplicate in Array

**Difficulty:** Easy · **Topic:** Arrays

## Description

Given a read-only array of n + 1 integers between 1 and n, find one number that repeats in linear time using less than O(n) space and traversing the stream sequentially O(1) times.

If there are multiple possible answers ( like in the sample case ), output any one, if there is no duplicate, output -1.

### Constraints

- `1 <= |A| <= 105`
- `1 <= A[i] <= |A|`

### Input Format

The first argument is an integer array A.

### Output Format

Return the integer that repeats in array A.

### Examples

**Input:**

```text
Input 1:
A = [3, 4, 1, 4, 2]
Input 2:
A = [1, 2, 3]
Input 3:
A = [3, 4, 1, 4, 1]
```

**Output:**

```text
Output 1:
4
Output 2:
-1
Output 3:
1
```

**Explanation:**

```text
Explanation 1:
4 repeats itself in the array [3, 4, 1, 4, 2]
Explanation 2:
No number repeats itself in the array [1, 2, 3]
Explanation 3:
1 and 4 repeats itself in the array [3, 4, 1, 4, 1], we can return 1 or 4
```

### Links

- [Interview Bit: Find Duplicate in Array](https://www.interviewbit.com/problems/find-duplicate-in-array/)
- [Leetcode: 287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/description/)

## Prequisites

- **Pigeonhole principle** - The given array has `n + 1` values, and each value
  is between `1` and `n`. There are only `n` different values available, but the
  array contains `n + 1` entries, so at least one value must repeat. The
  principle also works within a smaller group: if more entries fall into a group
  than there are possible values in that group, some value in the group must repeat.
- **Bucketing** - Group values into ranges and count per range instead of per value.
- **Cycle detection (two pointers)** - [Idea or pattern to look out for]

## Solution 1 (Least Optimal)

This is the obvious approach the other solutions improve on.

**Code:** [solutions/brute-force.js](solutions/brute-force.js)

### Solution 1 Intuition

A direct way to find a duplicate is to keep a counter for every possible value. As we read the array, we increase the counter for each value; a counter reaching two tells us that value has appeared before.

### Solution 1 Examples & Psuedocode

```text
def repeated_number(arr):
  create dict
  for(num in arr):
    count = map.get(num, 0) += 1
    if  count > 1:
      return num;
  
  return -1
```

### Solution 1 Complexity

- **Time:** **O(n)**
- **Space:** **O(n)**, because there can be about `n` possible values. The
  problem asks for less than **O(n)** space, so we need to store less information.

## Solution 2 (More Optimal)

**Code:** [solutions/bucket.js](solutions/bucket.js)

### Solution 2 Intuition

A bucket is just a group of values in a range. It groups by the **number's value**, not by where the number appears in the array.

We choose the bucket size to balance two amounts of space. If each bucket holds `b` values, then:

- The first pass needs one counter per bucket, or about `n / b` counters.
- The second pass needs one counter per possible value in the crowded bucket, or at most `b` counters.

If `b` is too small, there are many buckets to count. If `b` is too large, the crowded bucket needs many individual counters. To balance the two costs, set them about equal: `n / b ≈ b`. Solving gives `b ≈ √n`. This choice makes both the number of buckets and the number of values in a bucket about `√n`, keeping the extra space to **O(√n)**.

Each bucket needs just one counter. When we see a value, we figure out which range contains it and increase that bucket's counter. We do not yet count each individual value.

### Solution 2 Examples & Psuedocode

For the example below, `n = 8`, so `√n ≈ 2.83`. We use an integer bucket size of `2`, giving four buckets:

| Bucket | Values it can contain |
| --- | --- |
| 1 | `1, 2` |
| 2 | `3, 4` |
| 3 | `5, 6` |
| 4 | `7, 8` |

**First pass: find a crowded bucket.** Consider the array `[2, 7, 4, 3, 4, 1, 8, 6, 5]`. Its values are in the range `1` through `8`, so use the four buckets above.

- `2` and `1` go in the `1, 2` bucket: count `2`.
- `4`, `3`, and `4` go in the `3, 4` bucket: count `3`.
- `6` and `5` go in the `5, 6` bucket: count `2`.
- `7` and `8` go in the `7, 8` bucket: count `2`.

The `3, 4` bucket can hold only two distinct values: `3` and `4`. But three array entries landed there. Therefore, at least one of those entries must be a duplicate. The other buckets each received no more entries than their ranges can hold, so they do not establish a duplicate.

**Second pass: find the duplicate in that bucket.** Now look only at values from the crowded bucket, `3` through `4`. Count those values individually:

- `3` appears once.
- `4` appears twice.

So the repeated value is `4`. We only need counters for the values in this one bucket, rather than counters for every possible value.

[Write the pseudocode.]

```text
def repeated_number(arr):
  n = arr.len() - 1
  k = math.isqrt(n)
  n_buckets = math.ceil(n / k)
  counts = [0] * n_buckets

  for num in arr:
    b_idx = math.floor((num - 1) / k)
    low = b_idx * k + 1
    range = high - low + 1
    high = math.min(low + k - 1, n)

    if ++counts[b_idx] > range:
      break
  
  seen = [0] * range
  for val in arr:
    if val < low || val > high:
      continue
    if ++seen[val - low] > 1:
      return val
  
  return -1
```

### Solution 2 Complexity

- **Time:** **O(n)**, because each pass scans the input array once, so the array is traversed twice.
- **Space:** **O(√n)**

The stated `n + 1` entries in `1..n` condition guarantees a duplicate. Some examples in the problem statement show an array with no duplicate, which does not satisfy that condition. The implementation returns `-1` if it finds no duplicate, but that outcome is only possible for inputs outside the stated guarantee.

## Solution 3 (Most Optimal)

**Code:** [solutions/2pointer.js](solutions/2pointer.js)

### Solution 3 Intuition

[Explain the cycle-detection idea: why treating values as pointers to the next
index creates a cycle, and why the cycle's entry point is the duplicate.]

### Solution 3 Examples & Psuedocode

[Give a small example and write the pseudocode.]

```text
def repeated_number(arr):
  slow = 0, fast = 0

  for _i in arr:
    slow = arr[slow]
    fast = arr[arr[fast]]

    if (slow == fast):
      break
  
  if slow != fast:
    return -1
  
  slow = 0
  while(slow != fast):
    slow = arr[slow]
    fast = arr[fast]
  
  return slow
```

### Solution 3 Complexity

- **Time:** **O([...])**
- **Space:** **O(1)**

## Common Mistakes

[Explanation of common mistakes potentially made while coding.]
