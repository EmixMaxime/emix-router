const chai = require('chai');
const expect = require('chai').expect;

const parseGroup = require('../src/parseGroup').parseGroup;

function isGuest () {};
function isNotLocked () {};
function isEmix () {};

describe('parseRouteTest', () => {

  const resource = {
      path: '/login', // Attention pas de / à la fin, merci
      controller: 'AuthController',
      middleware: [isGuest, isNotLocked],
      actions: [
        { httpVerb: 'post', action: 'postLogin', middleware: [isEmix] },
        { httpVerb: 'get', action: 'getLogin', path: 'emix' }
      ]
  };

  const route1 = {
    httpVerb: 'post',
    path: '/login',
    controllerMethod: 'AuthController.postLogin',
    middleware: [isGuest, isNotLocked, isEmix] // important l'ordre!!
  };

  const route2 = {
    httpVerb: 'get',
    path: '/login/emix',
    controllerMethod: 'AuthController.getLogin',
    middleware: [isGuest, isNotLocked]
  };

  const expectedResult = new Set();
  expectedResult.add(route1).add(route2);

  it('It should return good Set', () => {
    const result = parseGroup(resource);
    expect(result).to.eql(expectedResult);
  });

});
