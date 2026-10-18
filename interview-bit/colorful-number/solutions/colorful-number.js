//param A : integer
//return an integer
export function colorful(A) {
    const text = String(A);
    if (text.length > 8) return 0;

    const digits = text.split("").map(Number);
    const seen = new Set();
    const n = digits.length;

    // A multi-digit colorful number uses distinct digits from 2-9 only, so it has at most 8 digits.
    for(let i = 0; i < n; i++) {
        let prod = 1;
        for(let j = i; j < n; j++) {
            prod *= digits[j];
            if (seen.has(prod)) return 0;
            seen.add(prod);
        }
    }

    return 1;
}