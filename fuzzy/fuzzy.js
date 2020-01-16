function fuzzyMatch(source, target) {
    var pos = 0;
    var tokens = source.split('');
    target.replace(/\ /gi, '').split('').forEach(function (tgt) {
        if (tgt.toLowerCase() === tokens[pos]) {
            pos++;
        }
    });
    return pos;
}
function nearWord(words, source) {
    var max = 1;
    var result = '';
    words.forEach(function (target) {
        var maxLen = fuzzyMatch(source, target);
        if (maxLen >= max) {
            max = maxLen;
            result = target;
        }
    });
    return result;
}
