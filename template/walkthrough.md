# Walkthrough

> **Pattern:** [Pattern name, e.g. Two pointers, Sliding window, Bucketing / pigeonhole]

## What is the problem really asking?

[Restate the problem in one or two plain sentences, without the story. Name the input, the output, and the one constraint that makes it hard (time, space, or "can't modify the input").]

## Why not the obvious approach?

[Describe the first solution most people would try. Give its time and space cost, then name the exact constraint it breaks. This tells the reader what the better solution has to improve.]

## The key observation

[State the one fact about the input that unlocks the solution. Explain why it is true, not just that it is true. If the fact has a name (e.g. pigeonhole principle, sorted order, monotonic window), name it here.]

## The idea

[Turn the observation into a plan in plain words, before any code. Define any new term the first time you use it (e.g. "A *bucket* is..."). If there is a design choice, like a size or a starting point, explain how to choose it and what happens if it is too big or too small.]

## Walking through an example

Consider `[small example input]`.

[Trace the idea step by step on a small input. Show the state after each meaningful step, using a list or a table.]

| Step | [State 1] | [State 2] | What happened |
| --- | --- | --- | --- |
| 1 | `[value]` | `[value]` | [Why this step matters] |

[End with the answer and connect it back to the key observation.]

## From idea to code

[Map each part of the plan to a part of `solution-file`. Point out any line that looks odd but is required, such as an off-by-one bound or an early return.]

## Why it is correct

[Argue in a few sentences why the approach always gives the right answer, not just on the example. What must stay true at every step (the *invariant*)? Why can't the answer be missed?]

## Complexity

- **Time:** **O([...])**, because [reason].
- **Space:** **O([...])**, because [reason].

[Say how this compares to the obvious approach and which constraint it now satisfies.]

## Edge cases

- [Edge case, e.g. empty input, a single element, all values equal]: [what happens and why]
- [Input outside the stated guarantee]: [what the implementation returns]

## Recognizing this pattern next time

[List the clues in a problem statement that should make you think of this pattern.]

- [Clue, e.g. "values are bounded by the array length"]
- [Clue, e.g. "less than O(n) extra space"]

## Common mistakes

- [Mistake, and how to avoid it]

## Related problems

- [Problem name]: [how it uses the same idea, or how it differs]
