//param S : string of digits
//return an integer
// Variant of colorful number: only substrings of length >= 2 that aren't the whole string count.
export function isColorfulString(S) {
    const digits = S.split("").map(Number);
    const seen = new Set();
    const n = digits.length;

    for (let i = 0; i < n; i++) {
        // Start from the first digit's value so the inner loop only sees substrings of length >= 2.
        let prod = digits[i];

        for (let j = i + 1; j < n; j++) {
            prod *= digits[j];

            const isFullString = i === 0 && j === n - 1;
            if (isFullString) continue;

            if (seen.has(prod)) return 0;
            seen.add(prod);
        }
    }

    return 1;
}
