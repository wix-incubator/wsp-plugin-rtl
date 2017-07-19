import {assert} from 'chai';
import Plugin from '../src/index';

describe('RTL/LTR transformations', () => {
    let rtl, key, value;

    describe('RTL', () => {
        beforeEach(() => {
            rtl = true;
        });

        it('START', () => {
            //Given
            key = 'margin-START';
            value = '5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'margin-right');
            assert.equal(result.value, '5px');
        });

        it('END', () => {
            //Given
            key = 'margin-END';
            value = '5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'margin-left');
            assert.equal(result.value, '5px');
        });

        it('STARTSIGN', () => {
            //Given
            key = 'padding';
            value = 'STARTSIGN5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'padding');
            assert.equal(result.value, '5px');
        });

        it('ENDSIGN', () => {
            //Given
            key = 'padding';
            value = 'ENDSIGN5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'padding');
            assert.equal(result.value, '-5px');
        });

        it('DIR', () => {
            //Given
            key = 'direction';
            value = 'DIR';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'direction');
            assert.equal(result.value, 'rtl');
        });
    });

    describe('LTR', () => {
        beforeEach(() => {
            rtl = false;
        });

        it('START', () => {
            //Given
            key = 'margin-START';
            value = '5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'margin-left');
            assert.equal(result.value, '5px');
        });

        it('END', () => {
            //Given
            key = 'margin-END';
            value = '5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'margin-right');
            assert.equal(result.value, '5px');
        });

        it('STARTSIGN', () => {
            //Given
            key = 'padding';
            value = 'STARTSIGN5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'padding');
            assert.equal(result.value, '-5px');
        });

        it('STARTSIGN should not be replaced in invalid syntax', () => {
            //Given
            key = 'padding';
            value = 'url(bas64fdsdfSTARTSIGNfdsx';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'padding');
            assert.equal(result.value, value);
        });

        it('ENDSIGN', () => {
            //Given
            key = 'padding';
            value = 'ENDSIGN5px';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'padding');
            assert.equal(result.value, '5px');
        });

        it('DIR', () => {
            //Given
            let css = '.foo { direction: DIR; }';
            key = 'direction';
            value = 'DIR';

            //When
            let result = run();

            //Then
            assert.equal(result.key, 'direction');
            assert.equal(result.value, 'ltr');
        });
    });

    function run() {
        let plugin = Plugin(rtl);
        return plugin(key, value);
    }
});
