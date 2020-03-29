import { html, fixture, expect, assert } from '@open-wc/testing';

import '../wces-router-brain.js';

describe('wces-router-brain', () => {

  describe('Basic usage', () => {
    it('can be instantiated without any attribute', async () => {
      await fixture(html`
        <wces-router-brain></wces-router-brain>
      `);
    });
  })

  describe('Normal usage', () => {
    /** @type {HTMLElement} */
    let element;
    /** @type {HTMLElement} */
    let component;
    /** @type {Array<import('../components/athena-router/wces-router-brain.js').RoutingConfig} */
    const routes = [
      {
        component: 'div',
        pattern: '/div/:param1/rest/:param2',
        id: 'simple-div'
      },
      {
        component: 'section',
        pattern: '/cool/:age',
        id: 'simple-section'
      }
    ]
    /** @type {import('../components/athena-router/wces-router-brain.js').RoutingConfig} */
    const route404 = {
      component: 'div',
      id: 'route-404'
    }

    /** @type {Location} */
    let location;

    beforeEach(async () => {
      location = { pathname: '/div/10/rest/bidule', search: '?q=Paris&w=100'};

      element = await fixture(html`
        <wces-router-brain .routes="${routes}" .location="${location}" .route404="${route404}"></wces-router-brain>
      `);
      component =  element.shadowRoot.getElementById('simple-div');
    });

    it('renders expected component with boolean attribute "active"', async () => {
      expect(component.tagName).to.equal('DIV');
      assert(component.hasAttribute('active'), 'expected component does not have attribute "active"');
    })

    it('passes routing params to rendered component', () => {
      const expectedParams = {
        params: { param1: '10', param2: 'bidule'},
        queryParams: { q: 'Paris', w: '100'}
      }
      expect(component.routingParams).to.deep.equal(expectedParams);
    });

    it('performs routing according to location change', () => {
      /** @type {Location} */
      const newLocation = { pathname: '/cool/31', search: ''};
      element.location = newLocation;
      const newComponent = element.shadowRoot.getElementById('simple-section');
      expect(newComponent.tagName).to.equal('SECTION');

      assert(newComponent.hasAttribute('active'), 'expected current page is not active');
      assert(!component.hasAttribute('active'), 'previous page is still active');

      const expectedParams = {
        params: { age: '31'},
        queryParams: { }
      }
      expect(newComponent.routingParams).to.deep.equal(expectedParams);
    });

    it('renders 404 route if no route is found', () => {
      /** @type {Location} */
      const unknownLocation = { pathname: '/unknown', search: ''};
      element.location = unknownLocation;
      const renderedComponent = element.shadowRoot.getElementById('route-404');
      expect(renderedComponent.hasAttribute('active')).to.equal(true);
      assert(!component.hasAttribute('active'), 'previous component is still active');
    })

    it('keeps previous page if no route found and route404 not specified', () => {
      /** @type {Location} */
      const unknownLocation = { pathname: '/unknown', search: ''};
      element.route404 = undefined;
      element.location = unknownLocation;
      assert(component.hasAttribute('active'), 'previous component is not active');
    })
  })

  // it('passes the a11y audit', async () => {
  //   await expect(element).shadowDom.to.be.accessible();
  // });
});