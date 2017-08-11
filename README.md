# wsp-plugin-rtl
A [wix-style-processor](https://github.com/wix/wix-style-processor) plugin that transforms CSS direction expressions, based on a given RTL/LTR parameter.

# Installation
```shell
$ npm i -S wsp-plugin-rtl
```

# Usage

Expression | RTL | LTR
---- | ---------- | -----------
START | right | left
END | left | right
STARTSIGN | '' | '-'
ENDSIGN | '-' | ''
DEG-START | 180 | 0
DEG-END | 0 | 180
DIR | rtl | ltr


##### CSS
```css
.my-selector {
    padding-START: 9px;   /* START will be replaced with left / right, given rtl = false / true */
    float: START;         /* Same as above, applied to the value */
    padding-END: 9px;     /* END will be replaced with left / right, given rtl = true / false */
    direction: DIR;     /* DIR will be replaced with ltr / rtl, given rtl = false / true */
    margin: STARTSIGN5px; /* STARTSIGN will be replaced with -, given rtl = false, and will be removed for rtl = true */
    margin: ENDSIGN5px;   /* ENDSIGN will be replaced with -, given rtl = true, and will be removed for rtl = false */
    transform: rotate(DEG-STARTdeg);
    transform: rotate(DEG-ENDdeg);
}
```

##### Plugin initialization

```javascript
import styleProcessor from 'wix-style-processor';
import RtlPlugin from 'wsp-plugin-rtl';

const isRtl = true; //or false for LTR
const rtlPlugin = RtlPlugin(isRtl);

$(document).ready(() => {
    styleProcessor.plugins.addDeclarationReplacer(rtlPlugin);
    styleProcessor.init().then(() => {
            //start rendering your application here - otherwise your app will flicker
        });
});
```
