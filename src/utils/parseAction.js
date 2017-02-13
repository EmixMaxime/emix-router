const _includes = require('lodash/includes');
const checkMiddleware = require('./checkMiddleware');

/**
 * Action = { httpVerb: 'post', action: 'postLogin', controller: 'controller' middleware?: [function] }
 * @param {Object} actionObject
 */
const ParseAction = function ({ _includes, checkMiddleware }) {
  const httpVerbAvailable = [
    'get', 'post', 'put', 'patch', 'delete'
  ];

  return (actionObject) => {
    const { httpVerb, controller, action, middleware, path } = actionObject;
    const route = {};

    // TODO: voir pour créer un valideur de variables
    if (!_includes(httpVerbAvailable, httpVerb)) throw Error('Verb : ${httpVerb} doesn\'t exists');
    if (typeof httpVerb !== 'string') throw Error(`httpVerb must be string, but it's ${typeof httpVerb}`);
    if (!controller) throw Error('controller must be defined');
    if (typeof controller !== 'string') throw Error(`controller must be string, but it's ${typeof controller}`);

    route.httpVerb = httpVerb;
    route.controllerMethod = `${controller}.${action}`;
    route.path = path;
    route.middleware = checkMiddleware(middleware);

    return route;
  }
};

const parseAction = ParseAction({ _includes, checkMiddleware });

module.exports = { parseAction, ParseAction };
