function isSubsequence2(s: string, t: string): boolean {
    // Initialize position map of char: arr of indices for that char
    const pos = new Map<string, number[]>();
    // Pass through t and fill out positions
    for(let i = 0; i < t.length; i++) {
        const c = t[i];
        const idxs = pos.get(c)
        if(idxs) idxs.push(i);
        else pos.set(c, [i]);
    }

    // Iterate each char in s and find index greater than last
    let prev = -1; // 0 has to be greater than something
    for(let i = 0; i < s.length; i++) {
        const idxs = pos.get(s[i]);
        if(!idxs) return false; // return false if char isn't in t

        let lo = 0, hi = idxs.length;
        while(lo < hi) {
            const mid = (lo + hi) >> 1;
            if(idxs[mid] <= prev) {
                lo = mid + 1
            }
            else {
                hi = mid;
            }
        }
        
        if(lo === idxs.length) return false;
        prev = idxs[lo];
    }

    return true
};