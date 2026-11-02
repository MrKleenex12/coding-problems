function isSubsequence3(s: string, t: string): boolean {
    const NOT_FOUND = -1;

    // Each distinct char in s gets its own column in the table
    const charToCol = new Map<string, number>();
    for (const c of s) {
        if (!charToCol.has(c)) charToCol.set(c, charToCol.size);
    }

    // nextIndex[tIdx][col] = first index >= tIdx in t holding that char
    const nextIndex: number[][] = new Array(t.length + 1);
    nextIndex[t.length] = new Array(charToCol.size).fill(NOT_FOUND);

    for (let tIdx = t.length - 1; tIdx >= 0; tIdx--) {
        // First copy the previous row over
        nextIndex[tIdx] = nextIndex[tIdx + 1].slice();
        
        const colOfChar = charToCol.get(t[tIdx]);
        if (colOfChar !== undefined) nextIndex[tIdx][colOfChar] = tIdx;
    }

    // searchFrom lets us only check next occurance from that index
    let searchFrom = 0;
    for (const c of s) {
        const matchIdx = nextIndex[searchFrom][charToCol.get(c)!];
        if (matchIdx === NOT_FOUND) return false;
        searchFrom = matchIdx + 1;
    }
    return true;
}