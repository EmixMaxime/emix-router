const chai = require('chai');
const expect = require('chai').expect;

const parseResource = require('../src/parseResource').parseResource;
const getRoutes = require('../index').getRoutes;

function isGuest () {};
function isNotLocked () {};
function isEmix () {};

describe('parseRouteTest', () => {

  it.skip('It should return good Set', () => {

    const resource = {
      path: '/documents',
      controller: 'DocumentsController',
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
    const result = parseResourceRoute(resource);
    console.log({result});
    // expect(result).to.eql(expectedResult);
  });

  it('It should be okay with only action with middleware', () => {
    const resource = {
      path: '/documents',
      controller: 'DocumentsController',
      middleware: isGuest,
      only: ['index', {action: 'show', middleware: isEmix}, {action: 'create', middleware: [isEmix, isNotLocked]}]
    };

    const indexRoute = {
      httpVerb: 'get',
      path: '/documents',
      controllerMethod: 'DocumentsController.index',
      middleware: [isGuest], // Il doit y être sur toutes les routes pcq c'est le middleware de la resource!
      name: 'documents.index'
    };

    const showRoute = {
      httpVerb: 'get',
      path: '/documents/:documents',
      controllerMethod: 'DocumentsController.show',
      middleware: [isGuest, isEmix],
      name: 'documents.show'
    };

    // The create route
    const createRoute = {
      httpVerb: 'get',
      path: '/documents/create',
      controllerMethod: 'DocumentsController.create',
      middleware: [isGuest, isEmix, isNotLocked],
      name: 'documents.create'
    };

    const expectedRoutes = [indexRoute, showRoute, createRoute];
    const result = parseResource(resource);

    expect(result).to.be.deep.equal(expectedRoutes);
  });

  it('It should be okay with without options', () => {
    const resource = {
      path: '/documents',
      controller: 'DocumentsController',
      middleware: isGuest,
      without: ['index', 'create', 'store', 'edit', 'update', 'show', 'update'] // Only delete
    };

    const deleteRoute = {
      httpVerb: 'delete',
      path: '/documents/:documents',
      controllerMethod: 'DocumentsController.delete',
      middleware: [isGuest],
      name: 'documents.delete'
    };

    const expectedRoutes = [deleteRoute];
    const result = parseResource(resource);

    expect(result).to.be.deep.equal(expectedRoutes);
  });

  it('It should be okay without middleware', () => {
    const resource = {
      path: '/documents',
      controller: 'DocumentsController',
      only: ['index']
    };

    const deleteRoute = {
      httpVerb: 'get',
      path: '/documents',
      controllerMethod: 'DocumentsController.index',
      middleware: [],
      name: 'documents.index'
    };

    const expectedRoutes = [deleteRoute];
    const result = parseResource(resource);

    expect(result).to.be.deep.equal(expectedRoutes);
  });

});
