const UnitLib = {
  gal: {
    short: 'gal',
    verbose: 'gallones',
  },
  km: {
    short: 'km',
    verbose: 'kilometres',
  },
  mi: {
    short: 'mi',
    verbose: 'miles',
  },
  lbs: {
    short: 'lbs',
    verbose: 'pounds',
  },
  L: {
    short: 'L',
    verbose: 'liters',
  },
}

function ConvertHandler() {

  const convertUnits = {
    gal: {
      ...UnitLib.gal,
      to: UnitLib.L,
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
    L: {
      ...UnitLib.L,
      to: UnitLib.gal,
      ratio: 0.264172,
    },
    km: {
      ...UnitLib.km,
      to: UnitLib.mi,
      ratio: 0.621371,
    },
    kg: {
      ...UnitLib.kg,
      to: UnitLib.lbs,
      ratio: 2.204622,
    }
  }

  const findConverConfig = (unitName) => {
    if (!convertUnits.hasOwnProperty(unitName)) {
      throw new Error('Invalid unit');
    }

    return convertUnits[unitName];
  }
  
  this.getNum = function(input) {
    // like '1' or '1.5' or '3/2'
    let matches = input.match(/[\d\.\/]*/);
    if (!matches) {
      return 1;
    }

    const result = matches.shift();
    // for '4//' or '4..' or '4/.'
    if (result.match(/[\/\.]{1}/g).length > 1) {
      throw new Error('Invalid number');
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    // like 'km' or 'l'
    let matches = input.match(/\D+$/);
    if (!matches) {
      throw new Error('Invalid unit');
    }
    return matches.shift();
  };
  
  this.getReturnUnit = function(initUnit) {
    return findConverConfig(initUnit).to.short;
  };

  this.convert = function(initNum, initUnit) {    
    return initNum * findConverConfig(initUnit).ratio;
  };
  
  this.getString = function(initNum, initUnit, returnNum) {
    const convertConfig = findConverConfig(initUnit);
    
    return `${initNum} ${convertConfig.verbose} converts to ${returnNum} ${convertConfig.to.verbose}`;
  };
  
}

module.exports = ConvertHandler;
