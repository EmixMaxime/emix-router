const chai = require('chai');
const expect = require('chai').expect;
const checkMiddleware = require('../src/utils/checkMiddleware');

function isEmix() {}

describe('checkMiddleware', () => {

  it('It should return empty array with empty string | undefined', () => {
    const result = checkMiddleware();
    expect(result).to.be.instanceof(Array);
    expect(result).to.be.deep.equal([]);
  });

  it('It should return an array with function parameter', () => {
    const result = checkMiddleware(isEmix);
    expect(result).to.deep.equal([isEmix]);
  });

  it('It should do nothing, just return my parameter', () => {
    const result = checkMiddleware([isEmix]);
    expect(result).to.deep.equal([isEmix]);
  });

});
