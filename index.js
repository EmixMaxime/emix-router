const parseResource = require('./src/parseResource').parseResource;
const parseGroup = require('./src/parseGroup').parseGroup;
const filterRouteByMiddleware = require('./src/filterRoute').filterRouteByMiddleware;
const addExpressRoutes = require('./src/addExpressRoutes');

function getRoutes (routes) {
  const routes = [];

  for (let resource of routes.resources) {
    routes.push(parseResource(resource));
  }

  for (let group in routes.groups) {
    routes.push(parseGroup(group));
  }
  
  return routes;
}

module.exports = {
  filterRouteByMiddleware,
  addExpressRoutes,
  getRoutes
};
