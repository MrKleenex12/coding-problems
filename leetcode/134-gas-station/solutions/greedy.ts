function canCompleteCircuit(gas: number[], cost: number[]): number {
    // Sum all gas and costs. If total gas cost is greater than total gas,
    // then a full cycle is always impossible. Therefore, return -1
    let gas_sum = 0, cost_sum = 0;
    let start_idx = 0, tank = 0;
    for(let i = 0; i < gas.length; i++) {
        gas_sum += gas[i];
        cost_sum += cost[i];
        
        // Check if circuit ends because not enough gas
        if(tank + gas[i] < cost[i]) {
            start_idx = i + 1;
            tank = 0;
            continue;
        }
        
        tank += gas[i] - cost[i]; // continue in current circut
    }

    // return -1 if circuit is impossible
    return (gas_sum < cost_sum) ? -1 : start_idx;
};