"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CM_TEXT_DATA = {
    THE_TEXT_KEY: 'The text value',
};
window.CM_TEXT_DATA = CM_TEXT_DATA;
function cm(options) {
    const { key, defaultText } = options;
    if (window.CM_TEXT_DATA[key]) {
        return window.CM_TEXT_DATA[key];
    }
    return defaultText;
}
exports.default = cm;
