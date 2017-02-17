const parseResource = require('./src/parseResource').parseResource;
const parseGroup = require('./src/parseGroup').parseGroup;
const filterRouteByMiddleware = require('./src/filterRoute').filterRouteByMiddleware;
const addExpressRoutes = require('./src/addExpressRoutes');

function getRoutes (routes) {
  const route = [];

  for (let resource of routes.resources) {
    route.push(parseResource(resource));
  }

  for (let group in routes.groups) {
    route.push(parseGroup(group));
  }

  return route;
}

module.exports = {
  filterRouteByMiddleware,
  addExpressRoutes,
  getRoutes
};
