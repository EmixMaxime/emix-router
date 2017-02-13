const checkMiddleware = require('./utils/checkMiddleware');
const mergeMiddleware = require('./utils/mergeMiddleware');
const parseAction = require('./utils/parseAction').parseAction;

const ParseGroupRoute = function ({ mergeMiddleware, checkMiddleware, parseAction }) {

  return (route) => {
    const { actions, controller, path } = route;
    const routes = new Set();
    const middleware = checkMiddleware(route.middleware);

    actions.forEach(action => {
      if (action.middleware) {
        action.middleware = mergeMiddleware(middleware, checkMiddleware(action.middleware));
      } else {
        action.middleware = middleware;
      }

      if (action.path) {
        action.path = mergePath(path, action.path);
      } else {
        action.path = path;
      }

      action.controller = controller;
      const actionRoute = parseAction(action);
      routes.add(actionRoute);
    });


    return routes;
  }
};

const GetParsedGroupRoute = function ({ parseGroupRoute }) {

  return (routes = []) => {
    let applicationRoutes;

    routes.forEach(route => {
      const dRoutes = parseGroupRoute(route);
      applicationRoutes = new Set([...dRoutes]); // Merge set : http://stackoverflow.com/a/32000937
    });

    return applicationRoutes;
  }
};

const parseGroupRoute = ParseGroupRoute({ mergeMiddleware, checkMiddleware, parseAction });
const getParsedGroupRoute = GetParsedGroupRoute({ parseGroupRoute });

module.exports = { getParsedGroupRoute, GetParsedGroupRoute, parseGroupRoute, ParseGroupRoute};
