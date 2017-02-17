/**
 * Add route into the Express router object
 * @param router
 * @param {Set} routes
 */
const addExpressRoutes = function (router, routes) {
  for (let route of routes) {
    const { httpVerb, path, middleware, controllerMethod } = route;
		router[httpVerb](path, middleware, controllerMethod);
  }
  
	return router;
};

module.exports = addExpressRoutes;
