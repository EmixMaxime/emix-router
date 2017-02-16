const _without = require('lodash/without');

/**
 *
 * @param {Object} resource
 * @return {Set}
 */
const ParseResourceRoutes = function ({ _without }, resource) {
	const routes = new Set();

	const { only, without, controller, path } = resource;
  const resourceMiddleware = resource.middleware; // TODO: voir pour le mettre dans le destructuring

  if (!controller) throw Error('Controller must be defined');
  if (!path) throw Error('Path must be defined');

	const absPath = path; // TODO: Attention, il faut vérifier qu'il y ai bien un / devant
	const relPath = path.replace(/^\//, ''); // On enlève le / devant si il y en a un

	const actionsWithPaths = [
		{ action: 'index', path: absPath, httpVerb: 'get' },
		{ action: 'create', path: `${absPath}/create`,  httpVerb: 'get' },
		{ action: 'store', path: absPath,  httpVerb: 'post' },
		{ action: 'show', path: `${path}/:${relPath}`, httpVerb: 'get' },
		{ action: 'edit', path: `${path}/:${relPath}/edit`, httpVerb: 'get' },
		{ action: 'update', path: `${path}/:${relPath}`, httpVerb: 'put' },
		{ action: 'delete', path: `${path}/:${relPath}`,  httpVerb: 'delete' } // Ex: path = category : category/:category
	];

	const actionsAvailable = actionsWithPaths.map(ap => ap.action); // -> 'index', 'create', 'store' ....

	if (only && without) throw new Error('Only et without ne peuvent pas être défini à deux');
  // Si je n'ai ni only ni without je met toutes les actions possibles
	const actions = (!only && !without) ? actionsAvailable : only || _without(actionsAvailable, ...without);

	// Ex: only: ['create', 'store', {action: 'show', middleware: [isAdministrator]} ],
	if (only) { // On peut définir des middleware à mettre sur des actions spécifiques
		actions.forEach(action => {
			let middleware = resourceMiddleware || [];
			if (typeof action !== 'string') { // C'est un objet : on doit ajouter le middleware
				middleware.push(...action.middleware); // action.middleware is an array
				action = action.action;
			}
			// middleware.push(Controller[action]) // Push at the end of middleware the Controller function

			const actionWithInformations = actionsWithPaths.filter(ap => ap.action === action ? ap : false)[0];
			// console.log({actionWithInformations})
			actionWithInformations.middleware = middleware;
			actionWithInformations.controllerMethod = `${controller}.${action}`;
			routes.add(actionWithInformations);
		});
	};

	return routes;
};

const ParseResourceRoutesFactory = (deps) => ParseResourceRoutes.bind(null, deps);
const parseResourceRoutes = ParseResourceRoutesFactory({ _without });

const GetParsedResourceRoute = function ({ parseResourceRoutes }, resourceRoutes = []) {
  let applicationRoutes;

  resourceRoutes.forEach(resourceRoute => {
    const dRoutes = parseResourceRoutes(resourceRoute);
    applicationRoutes = new Set([...dRoutes]); // Merge set : http://stackoverflow.com/a/32000937
  });

  return applicationRoutes;
};

const GetParsedResourceRouteFactory = (deps) => GetParsedResourceRoute.bind(null, deps);
const getParsedResourceRoute = GetParsedResourceRouteFactory({ parseResourceRoutes });

module.exports = {
  getParsedResourceRoute, GetParsedResourceRouteFactory,
  ParseResourceRoutesFactory, parseResourceRoutes
};
