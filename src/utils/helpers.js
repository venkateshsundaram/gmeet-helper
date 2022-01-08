import { selectText } from "./text";

export function copyToClipBoard(id) {
    selectText(id);
    document.execCommand("copy");
}

export function copyInputValueToClipBoard(id) {
    const content = document.getElementById(id);
    content.select();
    document.execCommand('copy');
}