import { html, LitElement } from 'lit-element';

class AppPage1 extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      routingParams: { type: Object },
      router: { type: Object },
    };
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
        <li><button @click="${() => this.goTo2()}">Go to second page</button></li>
        <li><a href="/page404">Go to No man's land :)</a></li>
      </ul>
    `;
  }

  goTo2() {
    if (this.router) {
      this.router.navigate('/page2/Jonatan');
    }
  }
}

customElements.define('app-page1', AppPage1);
