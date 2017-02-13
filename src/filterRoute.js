const _includes = require('lodash/includes');

/**
 *
 * @param {Object} route
 * @return {Function}
 */
const ContainsMiddleware = function ({ _includes }, route) {
  const { middleware:routeMiddleware } = route;

  return (middlewareName) => {
    let result = false;

    routeMiddleware.forEach(rm => {
      if (_includes(middlewareName, rm.name)) {
        result = true;
      }
    });

    return result;
  }
};

const containsMiddlewareFactory = (deps) => ContainsMiddleware.bind(null, deps);
const containsMiddleware = containsMiddlewareFactory({_includes});

/**
 *
 * @param {Object} routes
 * @param {Array} middlewareName
 */
const FilterRouteByMiddleware = ({ containsMiddleware }, routes, middlewareName) => {
  const matches = new Set();

  routes.forEach(route => {
    if (route.middleware) containsMiddleware(route)(middlewareName) ? matches.add(route) : '';
  });

  return matches;
};

const filterRouteByMiddlewareFactory = (deps) => FilterRouteByMiddleware.bind(null, deps);
const filterRouteByMiddleware = filterRouteByMiddlewareFactory({ containsMiddleware });

module.exports = { filterRouteByMiddleware, filterRouteByMiddlewareFactory };
