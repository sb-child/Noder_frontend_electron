const { remote } = require("electron");
var __lang_defined = true;
function _lang_SetLang(lang_name) {
    return remote.app._io_lang_SetLang(lang_name);
}
function _lang_GetNowLang() {
    return remote.app._io_lang_GetNowLang();
}
function _lang_GetLang(lang_index) {
    return remote.app._io_lang_GetLang(lang_index);
}
function _lang_GetLangList() {
    return remote.app._io_lang_GetLangList();
}
