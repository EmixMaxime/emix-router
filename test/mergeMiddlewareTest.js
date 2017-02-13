const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const mergeMiddleware = require('../src/utils/mergeMiddleware');

describe('mergePath', () => {
  it('Should add the second argument at the end of the first', () => {
    const firstMiddleware = ['auth', 'admin'];
    const secondMiddleware = ['mail'];

    const merged = mergeMiddleware(firstMiddleware, secondMiddleware);

    expect(firstMiddleware.concat(secondMiddleware)).to.eql(merged);
  })
});
