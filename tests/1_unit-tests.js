const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  const galConverConfig = {
    short: 'gal',
    verbose: 'gallons',
    to: {
      short: 'L',
      verbose: 'liters',
    },
    ratio: 3.78541
  };
  
  suite('getNum',function() {
    test('reuturnsCorrectInputNumber', function() {
      assert.equal(convertHandler.getNum('10gal'), 10);
    });
    test('reuturnsCorrectInputNumberForNumberWithDelimeter', function() {
      assert.equal(convertHandler.getNum('1.5gal'), 1.5);
      assert.equal(convertHandler.getNum('1/5gal'), 0.2);
      assert.equal(convertHandler.getNum('10/5.0gal'), 2);
    });
    test('reuturnsOneIfNoNumberReceived', function() {
      assert.equal(convertHandler.getNum('gal'), 1);
    });
    test('throwExceptionOnIncorrectNumber', function() {
      assert.throws(() => convertHandler.getNum('1..5gal'), 'invalid number');
    });
  });

  suite('getUnit', function() {
    test('reuturnsCorrectInputUnit', function() {
      assert.equal(convertHandler.getUnit('1/5gal'), 'gal');
      assert.equal(convertHandler.getUnit('5mi'), 'mi');
    });
    test('reuturnsCorrectInputUnitIfNoNumber', function() {
      assert.equal(convertHandler.getUnit('km'), 'km');
    });
    test('reuturnsInputUnitInLoserCase', function() {
      assert.equal(convertHandler.getUnit('1gal'), 'gal');
      assert.equal(convertHandler.getUnit('1GAL'), 'gal');
    });
    test('throwExceptionIfNoInputUnit', function() {
      assert.throws(() => convertHandler.getUnit('123'), 'invalid unit');
    });
  });

  suite('parseInput', function() {
    test('throwsUnitErrorOnIncorrectUnit', function() {
      assert.throws(() => convertHandler.parseInput('10'), 'invalid unit');
    });
    test('throwsNumberErrorOnIncorrectNumber', function() {
      assert.throws(() => convertHandler.parseInput('1..5gal'), 'invalid number');
    });
    test('throwsNumberAndUnitErrorOnBothIncorrect', function() {
      assert.throws(() => convertHandler.parseInput('1..5'), 'invalid number and unit');
    });
    test('returnsCorrectResult', function() {
      const { inputNum, convertConfig } = convertHandler.parseInput('10gal');
      assert.equal(inputNum, 10);
      assert.equal(convertConfig.short, 'gal');
    });
  });

  suite('getReturnUnit', function() {
    test('returnsCorrectResult', function() {
      assert.equal(convertHandler.getReturnUnit(galConverConfig), 'L');
    });
  });

  suite('convertValue', function() {
    test('returnsCorrectResult', function() {
      assert.equal(convertHandler.convertValue(1, galConverConfig), 3.78541);
    });
  });

  suite('getString', function() {
    test('returnsCorrectResult', function() {
      assert.equal(convertHandler.getString(1, galConverConfig, 3.78541), "1 gallons converts to 3.78541 liters");
    });
  });

  suite('convertInput', function() {
    test('returnsCorrectResult', function() {
      assert.deepEqual(
        convertHandler.convertInput('1gal'),
        {
          "initNum":1,
          "initUnit":"gal",
          "returnNum":3.78541,
          "returnUnit":"L",
          "string":"1 gallons converts to 3.78541 liters"
        }
      );
    });
  });

});