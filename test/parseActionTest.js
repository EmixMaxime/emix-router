const chai = require('chai');
const expect = require('chai').expect;

const parseAction = require('../src/utils/parseAction').parseActionFactory;

describe('parseAction', () => {
  const fakeMiddleware = () => {};
  const action = {
    httpVerb: 'get',
    controller: 'EmixController',
    action: 'show',
    middleware: fakeMiddleware,
    path: '/emix'
  };

  const expectedRoute = {
    httpVerb: 'get',
    controllerMethod: 'EmixController.show',
    path: '/emix',
    middleware: [fakeMiddleware]
  };

  it('It should returns route object', () => {
    const result = parseAction(action);
    expect(expectedRoute).to.eql(result);
  });

  it('It should throw Error', () => {
    action.httpVerb = 'emix';
    expect(() => parseAction(action)).to.throw(); // http://stackoverflow.com/questions/21587122/mocha-chai-expect-to-throw-not-catching-thrown-errors
  });
});
