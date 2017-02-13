const getParsedResourceRoute = require('./src/parseResourceRoute').getParsedResourceRoute;
const getParsedGroupRoute = require('./src/parseGroupRoute').getParsedGroupRoute;
const filterRouteByMiddleware = require('./src/filterRoute').filterRouteByMiddleware;
const addExpressRoutes = require('./src/addExpressRoutes');

const getRoutes = function (routes) {
  const resourcesRoute = getParsedResourceRoute(routes.resources);
  const groupRoute = getParsedGroupRoute(routes.groups);

  return new Set([...resourcesRoute, ...groupRoute]);
};

module.exports = {
  filterRouteByMiddleware,
  addExpressRoutes,
  getRoutes
};
