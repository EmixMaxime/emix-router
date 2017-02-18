const checkMiddleware = require('./checkMiddleware');

function mergeMiddleware ({ checkMiddleware }, controllerMiddleware, middleware) {
  controllerMiddleware = checkMiddleware(controllerMiddleware);
  middleware = checkMiddleware(middleware);
  return controllerMiddleware.concat(middleware);
};

module.exports = mergeMiddleware.bind(null, { checkMiddleware });

// Idea: mergeMiddleware(middleware1)(middleware2)(middleware3).get()
