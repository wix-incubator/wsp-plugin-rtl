export default rtl => {
    function rtlLtrTransformer(key, value, siteVars, evalCustomVar) { 
        key = replaceRtlStrings(key);
        value = replaceRtlStrings(value);
        return {key, value};
    }

    function replaceRtlStrings(str) {
        let replaced = str.replace(/STARTSIGN/g, rtl ? '' : '-')
                          .replace(/ENDSIGN/g, rtl ? '-' : '')
                          .replace(/START/g, rtl ? 'right' : 'left')
                          .replace(/END/g, rtl ? 'left' : 'right')
                          .replace(/DIR/g, rtl ? 'rtl' : 'ltr');
        return replaced;
    }

    return rtlLtrTransformer;
}
