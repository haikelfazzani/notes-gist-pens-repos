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
        var nmaxLettersMatch = fuzzyMatch(source, target);
        if (nmaxLettersMatch >= max) {
            max = nmaxLettersMatch;
            result = target;
        }
    });
    return result;
}
