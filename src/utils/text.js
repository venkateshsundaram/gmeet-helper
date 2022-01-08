export function selectText(containerid) {
    if (document.selection) {
      // IE
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
}


export function generateString(length) {
    let result = '';
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}