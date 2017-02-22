const _without = require('lodash/without');
const mergeMiddleware = require('./utils/mergeMiddleware');

/**
 *
 * @param {Object} resource
 * @return {Set}
 */
const ParseResource = function ({ _without, mergeMiddleware }, resource) {
	const routes = new Set();
	const { only, without, with: withOption, controller, path } = resource;
  
  // C'est toujours un tableau 

  const resourceMiddleware = resource.middleware === undefined ? [] 
                            : (Array.isArray(resource.middleware) ? resource.middleware : [resource.middleware]);

  if (!controller) throw new Error('Controller must be defined');
  if (!path) throw new Error('Path must be defined');

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
	const actions =
    (!only && !without)
    ? actionsAvailable
    : only || _without(actionsAvailable, ...without); // On prend les actions à "créer"

  const buildAndAddRoute = function (action, middleware) {
      // On va récupérer l'objet qui défini l'action, si on en trouve pas on retourne false = error
			const actionWithInformations = actionsWithPaths.filter(ap => ap.action === action ? ap : false)[0];
      if (actionWithInformations === false) throw new Error('Erreur qui ne devrait jamais arriver');
  
      delete actionWithInformations.action;
			actionWithInformations.middleware = middleware;
			actionWithInformations.controllerMethod = `${controller}.${action}`;
      actionWithInformations.name = `${relPath}.${action}`;

			routes.add(actionWithInformations);
  }

  function buildWithOption (withOptions) {
    if (withOptions === undefined) return;

    if (!Array.isArray(withOptions)) throw new Error('With option must be an Array');

    for (let withOption of withOptions) {
      const middleware = mergeMiddleware(resourceMiddleware, withOption.middleware);
      buildAndAddRoute(withOption.action, middleware);
    }
  }

	// Ex: only: ['create', 'store', {action: 'show', middleware: [isAdministrator]} ]
	if (only) { // On peut définir des middleware à mettre sur des actions spécifiques
    for (let action of actions) {
			if (typeof action !== 'string') { // C'est un objet : on doit ajouter le middleware
        const middleware = mergeMiddleware(resourceMiddleware, action.middleware);
				buildAndAddRoute(action.action, middleware);
			} else {
        buildAndAddRoute(action, resourceMiddleware);
      }
    }
	}
  else if (withOption) {
    // On s'occupe des actions par défaut
    const withAction = withOption.map(action => action.action);
    const defaultActions = _without(actions, ...withAction);

    for (let defaultAction of defaultActions) {
      buildAndAddRoute(defaultAction, resourceMiddleware);
    }
    // Puis celles précisées par le with option
    buildWithOption(withOption);
  }
  else {
    // J'ai toutes les actions par défaut, ou alors sans quelques actions (without)
    for (let action of actions) {
      buildAndAddRoute(action, resourceMiddleware);
    }
  }

	return [...routes]; // Utilisation de l'opérateur de décomposition pour transformer un Set en Array.
};

const ParseResourceFactory = (deps) => ParseResource.bind(null, deps);
const parseResource = ParseResourceFactory({ _without, mergeMiddleware });

module.exports = {
  ParseResourceFactory, parseResource
};
