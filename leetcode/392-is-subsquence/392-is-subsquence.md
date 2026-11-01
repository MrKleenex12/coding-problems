# Is Subsequence

## Description

Given two strings s and t, return true if s is a subsequence of t, or false
otherwise.

A subsequence of a string is a new string that is formed from the original string
by deleting some (can be none) of the characters without disturbing the relative
positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde"
while "aec" is not).

## Examples

```text
Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
```

```text
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
```

Constraints:

- `0 <= s.length <= 100`
- `0 <= t.length <= 104`
- `s and t consist only of lowercase English letters.`

Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where
k >= 109, and you want to check one by one to see if t has its subsequence.
In this scenario, how would you change your code?

## Solution 1: Two pointers

Keep one pointer in `s` and one in `t`, both starting at 0. Walk through `t` one
character at a time. Whenever the current character of `t` matches the current
character of `s`, advance the `s` pointer. The `t` pointer advances every step
either way.

- If the `s` pointer reaches `s.length`, every character of `s` was matched in
  order, so `s` **is** a subsequence.
- If you reach the end of `t` first, some character of `s` was never matched,
  so `s` **is not** a subsequence.

**Time:** O(|t|) per query. **Space:** O(1).

## Solution 2: Preprocessing + binary search

**Preprocessing:** Build an *index list* for `t`, a map from each character to
the list of indices where it appears in `t`. This is similar to an adjacency
list, where each key maps to a list. Because you scan `t` left to right, each
list comes out already sorted.

**Query:** For `s` to be a subsequence, its characters must be found in `t` at
strictly increasing indices. For example, in `s = "ab"`, the `b` you use must
come after the `a` you use. So track `prev`, the index in `t` of the last
matched character, starting at `-1`.

For each character `c` in `s`, binary search `c`'s index list for the **first
index greater than `prev`** (upper bound), then set `prev` to that index.
Picking the earliest valid index is a greedy choice. It leaves the most room in
`t` for the remaining characters of `s`.

Return false if either:

- `c` has no index list (it never appears in `t`), or
- the binary search returns `list.length`, meaning every occurrence of `c` is
  at or before `prev`.

If every character is matched, return true.

**Time:** O(|t|) to preprocess once, then O(|s| log |t|) per query.
**Space:** O(|t|).

**When to use it:** Only when checking many strings `s` against the same `t`.
For a single query, preprocessing costs O(|t|) anyway, so two pointers is
simpler and just as fast.
