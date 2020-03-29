import { html, LitElement } from "lit-element";

class App404 extends LitElement {

  static get properties() {
    return {
      active: { type: Boolean },
      routingParams: { type: Object }
    }
  }

  shouldUpdate() {
    return this.active;
  }

  render() {
    return html`
      <h1>404</h1>
      <p>
          This is App's 404. <a href="/">Get Back home</a>
      </p>
    `
  }
}

customElements.define('app-404', App404);

