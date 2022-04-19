'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    if (!input) {
      res.send('No input query param received');
    }

    try {
      const result = convertHandler.convertInput(input);
      res.status(200).json(result);
    } catch (e) {
      res.send(e.message);
    }
  })
};
