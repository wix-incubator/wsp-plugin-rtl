export default rtl => {
  function rtlLtrTransformer(key, value, siteVars, evalCustomVar) {
    key = replaceRtlStrings(key);
    value = replaceValue(value);
    return {key, value};
  }

  function replaceRtlStrings(str) {
    return str.replace(/STARTSIGN/g, getSTARTSIGN())
      .replace(/ENDSIGN/g, getENDSIGN())
      .replace(/START/g, getSTART())
      .replace(/END/g, getEND())
      .replace(/DIR/g, getDIR());
  }

  function replaceValue(str) {
    str = str.trim();
    if (str === 'DIR') {
      str = getDIR();
    } else if (str === 'END') {
      return getEND();
    } else if (str === 'START') {
      return getSTART();
    }
    if (str.match(/STARTSIGN\d/)) {
      str = str.replace('STARTSIGN', getSTARTSIGN());
    }
    if (str.match(/ENDSIGN\d/)) {
      str = str.replace('ENDSIGN', getENDSIGN());
    }
    if (str.match(/DEG-START/)) {
      str = str.replace('DEG-START', getDEGSTART());
    }
    if (str.match(/DEG-END/)) {
      str = str.replace('DEG-END', getDEGEND());
    }
    return str;
  }

  function getDIR() {
    return rtl ? 'rtl' : 'ltr';
  }

  function getEND() {
    return rtl ? 'left' : 'right';
  }

  function getSTART() {
    return rtl ? 'right' : 'left'
  }

  function getSTARTSIGN() {
    return rtl ? '' : '-';
  }

  function getENDSIGN() {
    return rtl ? '-' : '';
  }

  function getDEGSTART() {
    return rtl ? '180' : '0';
  }

  function getDEGEND() {
    return rtl ? '0' : '180';
  }

  return rtlLtrTransformer;
}
