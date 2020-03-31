import { html, LitElement } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';

import { WcesRouterBrain } from './WcesRouterBrain.js';
import basicRouter from './basic-router.js';

customElements.define('wces-router-brain', WcesRouterBrain);

/**
 * A component that listens to browser location change and performs routing
 * @element wces-router
 */
export class WcesRouter extends LitElement {
  static get properties() {
    return {
      _location: { type: Object },
      routes: { type: Array },
      route404: { type: Object },
      router: { type: Object },
    };
  }

  constructor() {
    super();
    this._router = this.getRouter(basicRouter);
  }

  render() {
    return html`
      <wces-router-brain
        .location="${this._location}"
        .routes="${this.routes}"
        .route404="${this.route404}"
        .router="${this.router}"
      >
      </wces-router-brain>
    `;
  }

  getRouter({ navigate: providedNavigate }) {
    const navigateFunc = url => {
      providedNavigate(url).then(() => {
        const { location } = window;
        this._location = { ...location };
      });
    };
    return {
      navigate: navigateFunc,
    };
  }

  set router(providedRouter) {
    this._router = this.getRouter(providedRouter);
    this.requestUpdate();
  }

  get router() {
    return this._router;
  }

  /**
   *
   * @param {import('lit-element').PropertyValues} changedProperties
   */
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    installRouter(location => {
      this._location = { ...location }; // Because location object keep the same reference - This is to force update
    });
  }
}
