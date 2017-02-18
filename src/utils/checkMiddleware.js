/**
 * Convert string to Array
 * @param {String|Array} middleware
 * @returns {Array}
 */
const checkMiddleware = function (middleware) {
  if (middleware) {
    if (!Array.isArray(middleware) && typeof middleware !== 'function') {
      throw Error('Route middleware must be a Function or Array');
    }
    /* Si ce n'est pas un Array je le transforme, sinon je l'assigne sans transformation */
    if (!Array.isArray(middleware)) {
      return [middleware];
    }
    return middleware;
  }
  return [];
};

module.exports = checkMiddleware;
