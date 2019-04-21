var path = require('path');
function rev(strings) {
    if (strings.length == 0)
        return '';
    else {
        let element = strings.pop();
        return path.join(rev(strings), element)
    }
}
function _(strings) {
    if (strings == [])
        return ''
    else
        return path.join(process.env.DEST_DIRECTORY, rev(strings))

}
module.exports= _;