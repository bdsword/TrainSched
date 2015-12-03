var assert = require('assert');
var convertor = require('../convertor.js');
var moment = require('moment');

describe('Convertor', function() {
  describe('#formatToSearchDate()', function () {
    var targets = [
      { input: '2014-01-03', output: '2014/01/03' },
      { input: '2015-01-03', output: '2015/01/03' },
      { input: '2013-04-08', output: '2013/04/08' }
    ];

    targets.forEach( function(targetTest){
      it( 'format "' + targetTest.input + '" as ' + targetTest.output, function(){
        assert.equal(targetTest.output, convertor.formatToSearchDate(moment, targetTest.input));
      })
    })
  });
});
