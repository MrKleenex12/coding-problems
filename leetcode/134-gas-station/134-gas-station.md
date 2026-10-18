# 134. Gas Station

## Description

There are n gas stations along a circular route, where the amount of gas at the
ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel
from the ith station to its next (i + 1)th station. You begin the journey with
an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index
if you can travel around the circuit once in the clockwise direction, otherwise
return -1. If there exists a solution, it is guaranteed to be unique.

### Example 1

Input: `gas = [1,2,3,4,5], cost = [3,4,5,1,2]`

Output: `3`

Explanation:

```text
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0+4=4

Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5

Travel to station 3. The cost is 5. Your gas is just enough to travel back to
station 3. Therefore, return 3 as the starting index.
```

### Example 2

Input: `gas = [2,3,4], cost = [3,4,3]`

Output: `-1`

Explanation:

```text
You can't start at station 0 or 1, as there is not enough gas to travel to the
next station.Let's start at station 2 and fill up with 4 unit of gas. Your tank
= 0 + 4 = 4

Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3

You cannot travel back to station 2, as it requires 4 unit of gas but you only have
3. Therefore, you can't travel around the circuit once no matter where you start.
```

### Constraints

- `n == gas.length == cost.length`
- `1 <= n <= 105`
- `0 <= gas[i], cost[i] <= 104`
- The input is generated such that the answer is unique.

## Prequisites

- **Greedy** - A **greedy algorithm** makes the choice that looks best at each
  step and never goes back to change it.

## Solution 1 (Least Optimal)

No code file. This is the obvious approach the greedy solution improves on.

### Solution 1 Intuition

Try every station as the start. For each start, drive the full circle and check
that the tank never goes below zero.

### Solution 1 Examples & Psuedocode

[Write the pseudocode for trying every start.]

### Solution 1 Complexity

- **Time:** **O(n²)**, because each check takes `O(n)` time and there are `n`
  starts. The problem allows `n` up to 10<sup>5</sup>, which is about
  10<sup>10</sup> steps, so this is too slow.
- **Space:** **O(1)**

## Solution 2 (Most Optimal)

**Code:** [solutions/greedy.ts](solutions/greedy.ts)

### Solution 2 Intuition

If the total gas is less than the total cost, no start works. The full circle
uses more gas than you collect, so you can't finish it from any station.

If the total gas is at least the total cost, a valid start exists. The problem
guarantees a single answer, so you only need to find it.

There is a second fact that makes one pass enough. Suppose you start at station
`s` and run out of gas before reaching station `j`. Then no station between `s`
and `j` can work as a start. Starting at a later station `k` leaves you with less
gas at `j` than starting at `s` did, because you reached `k` from `s` with gas
to spare. So starting at `k` fails too.

Drive the route once, starting at station `0`. Keep a running tank.

When the tank would drop below zero at station `j`, reset: set the start to
`j + 1` and the tank to `0`. The second fact tells you that no station before
`j + 1` can work.

When you reach the end, the last start is the answer, but only if the total gas
is at least the total cost. Otherwise, return `-1`.

Greedy works here because the reset rule never needs to be undone.

[Argue in a few sentences why the approach always gives the right answer, not just
on the example. What must stay true at every step (the *invariant*)? Why can't
the answer be missed?]

### Solution 2 Examples & Psuedocode

Consider `gas = [1,2,3,4], cost = [2,2,4,1]`.

| Step | [index] | [start] | [tank] | What happened |
| --- | --- | --- | --- | --- |
| 0 | `N/A` | `0` | `0` | The state before we checking gas |
| 1 | `0` | `0` | `-1` | `tank` + `gas[index]` - `cost[index]` = 0 + 1 - 2 |
| 2 | `0` | `0` | `0` | reset `tank` & `start` |
| 3 | `1` | `1` | `0` | `tank` + `gas[index]` - `cost[index]` = 0 + 2 - 2 |
| 4 | `2` | `1` | `-1` | `tank` + `gas[index]` - `cost[index]` = 0 + 3 - 4 |
| 5 | `2` | `3` | `0` | reset `tank` & `start` |
| 6 | `3` | `3` | `3` | `tank` + `gas[index]` - `cost[index]` = 0 + 4 - 1 |

Since `sum(gas)` is at least `sum(cost)`, there is a possible starting point. What we
end up with is `start` is index `3`.

[Write the pseudocode.]

### Solution 2 Complexity

- **Time:** **O(n)**, because we only pass through the array once.
- **Space:** **O(1)**, because our variables stay the same no matter the length of the array.

## Common Mistakes

### Not checking if total gas is at least total cost

You must always check if `sum(gas) >= sum(cost)` before returning an index to guarentee there
is a valid solution. Not checking this means you return always return an index even when there
is no possible cycle.

### Resetting to an Invalid Starting Index

After you find a failing station, you have to reset the starting index to `i + 1`.
Restarting at `0` or `i` is incorrect.

### Not Understanding Why Failed Stations Can Be Skipped

You are able to skip all stations in between the starting and the failing station because any
starting point in that stretch will still never be enough.
