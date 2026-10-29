function majorityElement2(nums: number[]): number {
    nums.sort((a, b) => a - b); // sort asc
    // Majority Element will always land at index n/2
    return nums[Math.floor(nums.length / 2)];
};