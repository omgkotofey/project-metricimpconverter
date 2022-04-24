const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Test correct input with nuber and unit', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=4gal')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          "initNum":4,
          "initUnit":"gal",
          "returnNum":15.14164,
          "returnUnit":"L",
          "string":"4 gallons converts to 15.14164 liters"
        });
        done();
      });
  });

  test('Test correct input with only with unit', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=gal')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          "initNum":1,
          "initUnit":"gal",
          "returnNum":3.78541,
          "returnUnit":"L",
          "string":"1 gallons converts to 3.78541 liters"
        });
        done();
      });
  });

  test('Test input with invalid number', (done) => {
    chai
     .request(server)
      .get('/api/convert?input=2//5gal')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });
  test('Test input with invalid unit', (done) => {
    chai
     .request(server)
      .get('/api/convert?input=1min')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });
  test('Test input with invalid unit and number', (done) => {
    chai
     .request(server)
      .get('/api/convert?input=2//min')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });
});
