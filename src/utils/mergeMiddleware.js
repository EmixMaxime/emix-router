const mergeMiddleware = function (controllerMiddleware, middleware) {
  if (!Array.isArray(controllerMiddleware) || !Array.isArray(middleware)) {
    throw Error(`${controllerMiddleware} and ${middleware} must be Array`);
  }
  return controllerMiddleware.concat(middleware);
};

module.exports = mergeMiddleware;

// Idea: mergeMiddleware(middleware1)(middleware2)(middleware3).get()
