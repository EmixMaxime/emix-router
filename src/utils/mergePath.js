const mergePath = function (controllerPath, path) {
  const firstSlash = '^\/';
  const lastSlash = '\/$';
  if (!controllerPath.match(lastSlash)) {
    controllerPath = controllerPath + '/';
  }

  if (!controllerPath.match(firstSlash)) {
    controllerPath = '/' + controllerPath;
  }

  if (path.match(firstSlash)) {
    path.replace(firstSlash, '');
  }

  return controllerPath + path;
};

module.exports = mergePath;
