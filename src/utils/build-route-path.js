export function buildRoutePath(path) {
  const routeParameterRegex = /:([a-zA-Z]+)/g; //Regex para identificar o id dinâmico

  const pathWithParams = path.replaceAll(routeParameterRegex, "(?<$1>[a-z0-9\-_]+)");

  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}