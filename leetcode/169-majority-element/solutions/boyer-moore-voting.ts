function majorityElement3(nums: number[]): number {
    let candidate = 0, count = 0;

    for(const x of nums) {
        if(count === 0) {
            candidate = x;
            count = 1;
        }
        else if(candidate === x) count++;
        else count--;
    }

    return candidate;

    // Uncommment if possible for no majority element
    // count = 0;
    // for(const x in nums) {
    //     if(candidate === x) count++;
    // }
    
    // return (count > Math.floor(nums.length / 2)) ? candidate : -1;
};