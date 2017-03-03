const getURL = (content)=> {
    let result = false;
    content.split(' ').forEach((word)=> {
        var match = word.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

        if (match) {
            result = word;
        }

    })
    return result
}

module.exports.getURL = getURL;
