import { html, LitElement } from 'lit-element';

class AppPage2 extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      routingParams: { type: Object },
    };
  }

  shouldUpdate() {
    return this.active;
  }

  render() {
    const { greeting } = this.context;
    return html`
      <h1>Page 2</h1>
      <p>${greeting}</p>
      <p>This is App's second page. <a href="/">Get Back home</a></p>
    `;
  }
}

customElements.define('app-page2', AppPage2);
