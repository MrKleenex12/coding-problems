//param A : array of integers
//return an integer
// Uses O(n) space, which the problem forbids; kept as the baseline the bucket solution improves on.
export function repeatedNumber(A) {
    const counts = new Map();

    for (const a of A) {
        const count = (counts.get(a) ?? 0) + 1;
        if (count > 1) return a;

        counts.set(a, count);
    }

    return -1;
}
