import { UrlPattern } from './url-pattern.js';

export function parseQueryParams(query = '') {
  const queryParams = new URLSearchParams(query);
  const params = {};
  for (const [key, value] of queryParams.entries()) {
    params[key] = value;
  }
  return params;
}

/**
 * Match url path against a pattern and extract params
 * @param {string} pattern routing pattern to match the route against
 * @param {string} path url path
 * @param {string} search query string part
 * @returns {RoutingParam}
 */
export function parseRoute(pattern, path, search = '') {
  const urlPattern = new UrlPattern(pattern);
  // @ts-ignore
  const params = urlPattern.match(decodeURIComponent(path));
  if (params) {
    return {
      params,
      queryParams: parseQueryParams(search),
    };
  }
  return null;
}

/**
 * Routing parameters
 * @typedef {Object} RoutingParam
 * @property {Object} params
 * @property {Object} queryParams
 */