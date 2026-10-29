function majorityElement(nums: number[]): number {
    const seen = new Map();
    const threshold = Math.floor(nums.length / 2);

    for(const x of nums) {
        // If not seen before set as one, otherwise add one
        const count = (seen.get(x) || 0) + 1;
        
        seen.set(x, count);
        if(count > threshold) return x;
    }

    return -1;
};