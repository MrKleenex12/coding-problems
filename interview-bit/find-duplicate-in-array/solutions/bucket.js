//param A : array of integers
//return an integer
export function repeatedNumber(A) {
    const n = A.length - 1; // array size
    const k = Math.floor(Math.sqrt(n)); // bucket size = integer sqrt(n)
    const n_buckets = Math.ceil(n / k); // Extra bucket for non perfect squares


    // Each index is a counter for a bucket
    const counts = new Array(n_buckets).fill(0);

    let b_idx, high, low;
    // First pass to count sort each number into respective bucket counter
    for (const a of A) {
        b_idx = Math.floor((a - 1) / k); // Find which bucket index to count

        // high and low represent the ends of the bucket range
        low = b_idx * k + 1;
        high = Math.min(low + k - 1, n);
        const range = high - low + 1;

        if (++counts[b_idx] > range) {
            break;
        }
    }

    const seen = new Array(range).fill(0);

    for (const a of A) {
        if (a < low || a > high) continue;
        const s_idx = a - low;
        if (++seen[s_idx] > 1) return a;
    }

    return -1;
}
