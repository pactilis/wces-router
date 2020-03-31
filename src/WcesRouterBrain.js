import { parseRoute } from './route-parser.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .page {
      display: none;
    }

    .page[active] {
      display: block;
    }
  </style>
  <div class="content" id="content"></div>
`;

export class WcesRouterBrain extends HTMLElement {
  constructor() {
    super();
    /**
     * @type { Array<RoutingConfig> }
     */
    this.routes = [];
    /**
     * @type {RoutingConfig}
     */
    this.route404 = null;

    /**
     * Router object to pass down to pages
     */
    this.router = null;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * @type {Location}
   */
  get location() {
    return this._location;
  }

  /**
   * @param {Location} value
   */
  set location(value) {
    this._location = value;
    if (value) {
      this.handleNavigation(value);
    }
  }

  /**
   * Handle routing
   * @param {Location} location
   */
  handleNavigation(location) {
    const routingData = this.findRoute(location);
    if (routingData) {
      this.performRouting(routingData);
    }
  }

  /**
   * Find or create component to render in the page
   * @param {RoutingData} routingData
   */
  performRouting(routingData) {
    if (routingData.route.url) {
      import(routingData.route.url).catch(err =>
        console.error('Unable to load ', routingData.route.component, err),
      );
    }
    const content = this.shadowRoot.getElementById('content');
    if (!content) {
      return;
    }
    let found = false;
    for (const element of content.children) {
      if (element.hasAttribute('active')) {
        element.removeAttribute('active');
      }
      if (element.getAttribute('id') === routingData.route.id) {
        element.setAttribute('active', '');
        // @ts-ignore
        element.routingParams = routingData.routingParams;
        element.router = this.router;
        found = true;
      }
    }
    if (!found) {
      // component does not exist yet - creating it
      const element = document.createElement(routingData.route.component);
      element.className = 'page';
      element.setAttribute('id', routingData.route.id);
      element.setAttribute('active', '');
      // @ts-ignore
      element.routingParams = routingData.routingParams;
      element.router = this.router;
      content.appendChild(element);
    }
  }

  /**
   * Match against routes configs array
   * @param {Location} location browser location object
   * @returns {RoutingData}
   */
  findRoute(location) {
    const { pathname: path, search } = location;

    for (const route of this.routes) {
      const routingParams = parseRoute(route.pattern, path, search);
      if (routingParams) {
        return {
          routingParams,
          route,
        };
      }
    }
    // return 404 route if exists
    if (this.route404) {
      return {
        routingParams: {
          params: {},
          queryParams: {},
        },
        route: this.route404,
      };
    }
    return null;
  }
}

/**
 * A routing config item
 * @typedef {Object} RoutingConfig
 * @property {string} pattern The route path pattern
 * @property {string} component The component name to render
 * @property {string} url The url path to fetch the component lazilly
 * @property {string} id identifier of this routing config item
 */

/**
 * A routing data object
 * @typedef {Object} RoutingData
 * @property {RoutingConfig} route routing config item
 * @property {import('./utils/route-parser.js.js').RoutingParam} routingParams
 */
