function findDuplicate(nums: number[]): number {
    const n = nums.length - 1;
    const k = Math.floor(Math.sqrt(n));
    const n_buckets = Math.ceil(n / k);
    const counts = new Array(n_buckets).fill(0);

    let b_idx = 0, low = 0, high = 0, range = 0;
    for(const x of nums) {
        b_idx = Math.floor((x-1) / k);
        low = b_idx * k + 1;
        high = Math.min(low + k - 1, n);
        
        range = high - low + 1;
        if(++counts[b_idx] > range) break;
    }

    const seen = new Array(range).fill(0);

    for(const x of nums) {
        if(x < low || x > high) continue;

        if(++seen[x-low] > 1) return x;
    }

    return -1;
};