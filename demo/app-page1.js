import { html, LitElement } from "lit-element";

class AppPage1 extends LitElement {

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
      <h1>Page 1</h1>
      <p>
          This is App's first page.
      </p>

      <ul>
          <li><a href="/page2/Jonatan">Go to second page</a></li>
          <li><a href="/page404">Go to No man's land :)</a></li>
      </ul>

    `
  }
}

customElements.define('app-page1', AppPage1);

