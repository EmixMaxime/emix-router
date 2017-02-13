const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const mergePath = require('../src/utils/mergePath');

describe('mergePath', () => {
  it('Without the slash before both arguments', () => {
    const path1 = 'lol'; const path2 = 'mdr';
    const expectedPath = `/${path1}/${path2}`;
    const path = mergePath(path1, path2);
    expect(expectedPath).to.equal(path);
  });

  it('With the / before for the first argument and the second without', () => {
    const path1 = '/lol'; const path2 = 'mdr';
    const expectedPath = `${path1}/${path2}`;
    const path = mergePath(path1, path2);
    expect(expectedPath).to.equal(path);
  });

  it('Without the / before the first argument and the second with', () => {
    const path1 = 'lol'; const path2 = '/mdr';
    const expectedPath = `/${path1}/${path2}`;
    const path = mergePath(path1, path2);
    expect(expectedPath).to.equal(path);
  });
});
