function isSubsequence(s: string, t: string): boolean {
    let i = 0;
    for(const c of t) {
        if(i === s.length) return true;
        if(c === s[i]) i++;
    }

    return i === s.length;
};