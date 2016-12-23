'use strict'

exports.findFirstHoleInSequence = function(sequence) {
    sequence = sequence.sort((a,b)=>a-b)
    if (!sequence.length) return 1
    for (let i=1;i<sequence.length;i++) {
        if (sequence[i] > sequence[i-1]+1) return sequence[i-1]+1
    }
    return sequence[sequence.length-1] + 1
}
