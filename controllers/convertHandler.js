const UnitLib = {
  gal: {
    short: 'gal',
    verbose: 'gallons',
  },
  km: {
    short: 'km',
    verbose: 'kilometers',
  },
  mi: {
    short: 'mi',
    verbose: 'miles',
  },
  lbs: {
    short: 'lbs',
    verbose: 'pounds',
  },
  kg: {
    short: 'kg',
    verbose: 'kilograms',
  },
  l: {
    short: 'L',
    verbose: 'liters',
  },
}

function ConvertHandler() {

  const convertUnits = {
    gal: {
      ...UnitLib.gal,
      to: UnitLib.l,
      ratio: 3.78541,
    },
    mi: {
      ...UnitLib.mi,
      to: UnitLib.km,
      ratio: 1.60934,
    },
    lbs: {
      ...UnitLib.lbs,
      to: UnitLib.kg,
      ratio: 0.453592,
    },
    l: {
      ...UnitLib.l,
      to: UnitLib.gal,
      ratio: 0.264172,
    },
    km: {
      ...UnitLib.km,
      to: UnitLib.mi,
      ratio: 0.621373,
    },
    kg: {
      ...UnitLib.kg,
      to: UnitLib.lbs,
      ratio: 2.204624,
    }
  }

  const findConvertConfig = (unitName) => {
    if (!convertUnits.hasOwnProperty(unitName)) {
      throw new Error('invalid unit');
    }

    return convertUnits[unitName];
  }
  
  this.getNum = function(input) {
    // like '1' or '1.5' or '3/2'
    let matches = input.match(/[\d\.\/]*/);
    if (!matches || !matches.filter((item)=>!!item).length) {
      return 1;
    }
    const result = matches.shift();
    
    // for '4//' or '4..' or '4/.'
    const delimeters = result.match(/[\/\.]/g);
    if (delimeters) {
      if (result.includes('..') || result.includes('//')) {
        throw new Error('invalid number');
      }

      if (delimeters.includes('/')) {
        const parts = result.split('/');
        return parts[0] / parts[1];
      }
    } 
    
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    // like 'km' or 'l'
    let matches = input.match(/\D+$/);
    if (!matches || !matches.length) {
      throw new Error('invalid unit');
    }
    return matches.shift().toLowerCase();
  };

  this.parseInput = function(input) {
    let errors = [];
    const parseResult = {};

    try {
      parseResult.inputNum = this.getNum(input);
    } catch (e) {
      errors.push(e);
    }

    try {
      parseResult.convertConfig = findConvertConfig(this.getUnit(input));
    } catch (e) {
      errors.push(e);
    }

    errors = errors.filter(item => !!item);
    if (!errors.length) {
      return parseResult;
    }
    if (errors.length == 2) {
      throw new Error('invalid number and unit');
    }

    throw errors[0];
  }
  
  this.getReturnUnit = function(convertConfig) {
    return convertConfig.to.short;
  };

  this.convertValue = function(initNum, convertConfig) {    
    return +(initNum * convertConfig.ratio).toFixed(5);
  };
  
  this.getString = function(initNum, convertConfig, returnNum) {
    return `${initNum} ${convertConfig.verbose} converts to ${returnNum} ${convertConfig.to.verbose}`;
  };

  this.convertInput = function(input) {
    const { inputNum, convertConfig } = this.parseInput(input);
    
    const convertedNum = this.convertValue(inputNum, convertConfig);
    const convertedNumUnit = this.getReturnUnit(convertConfig);
    const string = this.getString(inputNum, convertConfig, convertedNum);

    return {
        initNum: inputNum, 
        initUnit: convertConfig.short, 
        returnNum: convertedNum, 
        returnUnit: convertedNumUnit, 
        string: string
      };
  }
  
}

module.exports = ConvertHandler;
