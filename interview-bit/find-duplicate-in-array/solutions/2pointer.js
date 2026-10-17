//param A : array of integers
//return an integer
// Values act as pointers to the next index, so a duplicate creates a cycle whose entry point is the duplicate.
export function repeatedNumber(A) {
    let slow = 0, fast = 0;
    for(const i in A) {
        slow = A[slow];
        fast = A[A[fast]];

        if (slow === fast) break;
    }
    if (slow != fast) return -1;

    slow = 0;
    while(slow != fast) {
        slow = A[slow];
        fast = A[fast];
    }

    return slow;
}
