[![build status](https://gitlab.com/EmixMaxime/emix-router/badges/master/build.svg)](https://gitlab.com/EmixMaxime/emix-router/commits/master)

# Emix Router
# Utilisation
```javascript
// prepareRoute.js
const controllersPath = '/app/controllers'

export const prepareRoute = (routes) => {

  routes.forEach(route => {
    const { controllerMethod } = route;
    console.log({route, controllerMethod});
    const [controller, method] = controllerMethod.split('.');
    const Controller = require(`${controllersPath}/${controller}`).default;

    route.controllerMethod = Controller[method];
  });

  return routes;
};

export default prepareRoute;
```

```javascript
const emixRouter = require('emix-router');
const { getRoutes, filterRouteByMiddleware, addExpressRoutes } = emixRouter;

const routesApp = getRoutes(routes);
const authMiddleware = [
	isAuthenticated.name, isAdministrator.name // const emix = () => {}; emix.name -> emix (the name of the function)
];
export const protectedRoutes = filterRouteByMiddleware(routesApp, authMiddleware);
// Controller = string, je dois récupérer les instances :)
const finalRoutes = prepareRoute(routesApp);
Router = addExpressRoutes(Router, finalRoutes);
```

# Todo :
- Revoir tout le code.
- Écrire les tests unitaires (ils sont loin d'êtres optimaux, ils ne couvrent presque rien!).

La documentation est à venir
