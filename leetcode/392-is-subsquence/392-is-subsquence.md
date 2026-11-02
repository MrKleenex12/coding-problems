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

The most straightforward way is to walk through `t` and check off the
characters of `s` in order. Keep track of which character of `s` you're looking
for. Every time you see it in `t`, move on to the next one. If you check off
every character of `s`, it's a subsequence. If you run out of `t` first, it
isn't.

Complexity:

- Space: `O(1)`
- Time: `O(m)` where `m = t.length`

This is the easiest way to solve this problem. But what if we have to check
billions of different `s` strings against the same `t`? Scanning all of `t`
every time is too slow.

## Solution 2: Preprocessing and binary search

Instead of rescanning `t`, scan it once and write down every index where each
character appears. Because we scan left to right, each character's list of
indices is already sorted.

Now, to check `s`, remember where in `t` the last match happened. For each
character of `s`, binary search its list for the first index that comes after
the last match. Always taking the earliest possible match is safe, because it
leaves the most room in `t` for the rest of `s`. If a character never appears
in `t`, or only appears before the last match, then `s` isn't a subsequence.

Complexity:

- Space: `O(m)`
- Time: `O(m)` to preprocess once, then `O(|s| log m)` per query

Each query no longer depends on scanning all of `t`, only on a binary search
for each character. Can we get rid of the binary search too?

## Solution 3: Next occurrence matrix

Build a table that answers one question instantly: "starting at this index in
`t`, where is the next occurrence of this character?" There is a row for every
index in `t`, plus one extra row for "past the end", and a column for every
character (26 for lowercase letters).

Fill the table from right to left. Each row is the same as the row after it,
except that the character at the current index now occurs right here. So copy
the next row and update one cell. The extra row at the end is all `-1`, meaning
nothing is left.

To check `s`, start at the beginning of `t` and look up where the first
character of `s` next appears. Then jump to just after that spot and look up
the next character, and so on. If a lookup ever returns `-1`, that character
doesn't appear anywhere ahead, so `s` isn't a subsequence.

Complexity:

- Space: `O(26 · m)`
- Time: `O(26 · m)` to build, then `O(|s|)` per query

This trades memory for speed: every step of a query is a single lookup instead
of a binary search. It only makes sense for a small alphabet, since the table
needs a column for every possible character.
