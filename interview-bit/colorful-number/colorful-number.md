# Colorful Number/String

## Description

For Given Number A, find if it's a COLORFUL number or not.

### COLORFUL number

A number can be broken into different contiguous sub-subsequence parts.
Suppose, a number 3245 can be broken into parts like 3 2 4 5 32 24 45 324 245.
And this number is a COLORFUL number, since product of every digit of a contiguous
subsequence is different.

Return 1 if A is a COLORFUL number, else return 0

### Problem Constraints

`0 <= A <= 109`

#### Input Format

The first argument is an integer A.

#### Output Format

Return 1 if A is a COLORFUL number, else return 0

#### Example Input

`A = 23`

#### Example Output

`1`

#### Example Explanation

```text
A = 23
2 3 23
2 -> 2
3 -> 3
23 -> 6

this number is a COLORFUL number since the product of every digit of a sub-sequence is different.

Output: 1
```

### Variant: Colorful String

Same idea, but only count contiguous substrings that are **at least 2 characters
long** and are **not the full string**. Single digits and the whole string are
skipped.

For `3245`, the parts checked are `32 24 45 324 245`. A string of 2 or fewer
digits has no parts to check, so it is colorful.

Code: [solutions/colorful-string.js](solutions/colorful-string.js)

### Relevant Content/Links

- [interviewbit-colorful-number](https://www.interviewbit.com/problems/colorful-number/)
- Colorful String variant: no public link

## Prequisites

- **Hashing** - A `Set` remembers every product seen so far and answers "have
  I seen this before?" in O(1) time, so duplicates are caught the moment they appear.
- **Pigeonhole principle** - If there are more items than possible values, some
  value must repeat. Here it caps how many digits a colorful number can have.

## Solution 1 (Least Optimal)

No code file. This is [solutions/colorful-number.js](solutions/colorful-number.js)
without the length check.

### Solution 1 Intuition

Every contiguous run of digits has a product. Go through the runs one at a
time and keep a list of products already seen. If a product shows up twice,
the number is not colorful. If every run is checked without a repeat, it is.

Each run starts at some digit `i` and ends at some digit `j` at or after it.
Instead of multiplying the whole run from scratch, keep a running product: the
run `i..j` is just the run `i..j-1` times one more digit.

### Solution 1 Examples & Psuedocode

Consider `A = 236`, so the digits are `[2, 3, 6]`.

| Start `i` | End `j` | Run | Product | Seen before? |
| --- | --- | --- | --- | --- |
| `0` | `0` | `2` | `2` | No |
| `0` | `1` | `23` | `6` | No |
| `0` | `2` | `236` | `36` | No |
| `1` | `1` | `3` | `3` | No |
| `1` | `2` | `36` | `18` | No |
| `2` | `2` | `6` | `6` | **Yes**, from `23` |

`6` repeats, so `236` is not colorful and the answer is `0`.

```text
def colorful(A):
  digits = digits of A
  seen = empty set

  for i from 0 to n - 1:
    prod = 1
    for j from i to n - 1:
      prod = prod * digits[j]
      if prod in seen:
        return 0
      add prod to seen

  return 1
```

### Solution 1 Complexity

- **Time:** **O(n²)**, because there are `n(n + 1) / 2` runs and each takes
  O(1) work with the running product.
- **Space:** **O(n²)**, because `seen` can hold one product per run.

Since `A <= 10^9` has at most 10 digits, this is at most 55 products in
practice.

## Solution 2 (Most Optimal)

**Code:** [solutions/colorful-number.js](solutions/colorful-number.js)

### Solution 2 Intuition

Some numbers can be rejected just by their length. In a number with more than
one digit:

- **Every digit must be different.** Each single digit is its own run, so a
  repeated digit means a repeated product.
- **It can't contain `0`.** Any run with `0` in it has product `0`, which
  repeats the single digit `0`.
- **It can't contain `1`.** The run `1d` has product `d`, which repeats the
  single digit `d`.

That leaves only the digits `2` through `9`, which is 8 possible values. By the
pigeonhole principle, a number with more than 8 digits must repeat one, so it
can't be colorful. Check the length first and return `0` before doing any
multiplication. Otherwise, run Solution 1 on at most 8 digits.

### Solution 2 Examples & Psuedocode

`A = 234567892` has 9 digits, so it returns `0` immediately. The repeated `2`
would have been caught by the loop too, but only after more work.

`A = 3245` has 4 digits, so it passes the length check and runs the same
nested loop as Solution 1.

```text
def colorful(A):
  text = A as a string
  if length of text > 8:
    return 0

  run Solution 1 on the digits of text
```

### Solution 2 Complexity

- **Time:** **O(n)**, because converting `A` to a string is the only step that
  grows with the input. After the check, the loop does at most 36 products.
- **Space:** **O(1)** extra, because `digits` holds at most 8 values and `seen`
  at most 36 products.

## Common Mistakes

### Using bracket lookup on a Set

`seen[prod]` reads a property on the `Set` object, not a member of the set. It
is always `undefined`, so a check like `seen[prod] !== null` is always true and
every number returns `0`. Use `seen.has(prod)` to check membership.

### Not declaring the inner loop variable

`for (j = i; ...)` without `let` assigns to an undeclared variable. Module code
runs in strict mode, so this throws a `ReferenceError`. Write `for (let j = i; ...)`.

### Splitting before the length check

Converting the whole number into a digit array before checking its length
builds a full-size array only to throw it away. Check `text.length` first so
the extra space stays O(1).

### Using the length check on the Colorful String variant

The variant skips single digits, so repeated digits don't automatically fail.
For example, `22` has no runs to check and is colorful. The `length > 8`
shortcut would give wrong answers there.
