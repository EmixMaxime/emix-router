const checkMiddleware = require('./utils/checkMiddleware');
const mergeMiddleware = require('./utils/mergeMiddleware');
const mergePath = require('./utils/mergePath');
const parseAction = require('./utils/parseAction').parseAction;

const ParseGroup = function ({ mergeMiddleware, checkMiddleware, parseAction, mergePath }) {
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

const parseGroup = ParseGroup({ mergeMiddleware, checkMiddleware, parseAction, mergePath });

module.exports = {
  ParseGroup, parseGroup
};
