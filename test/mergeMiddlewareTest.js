const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const mergeMiddleware = require('../src/utils/mergeMiddleware');

function auth () {}
function admin () {}
function mail () {}

describe('mergePath', () => {

  it('It should add the second argument at the end of the first', () => {
    const firstMiddleware = [auth, admin];
    const secondMiddleware = [mail];

    const merged = mergeMiddleware(firstMiddleware, secondMiddleware);

    expect(firstMiddleware.concat(secondMiddleware)).to.deep.equal(merged);
  });

  it('It should add the second argument (string) at the end of the first (array)', () => {
    const firstMiddleware = [auth, admin];
    const secondMiddleware = mail;

    const merged = mergeMiddleware(firstMiddleware, secondMiddleware);
    expect(firstMiddleware.concat([secondMiddleware])).to.deep.equal(merged);
  });

});
