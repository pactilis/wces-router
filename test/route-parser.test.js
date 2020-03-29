import { expect, assert } from '@open-wc/testing';
import { parseRoute } from '../src/route-parser.js';

describe('route parser', () => {
  it('parse simple route', () => {
    const pattern = '/demo';
    expect(parseRoute(pattern, '/demo')).to.deep.equal({ params: {}, queryParams: {} });
  });

  it('parse simple route with query params', () => {
    const pattern = '/demo';
    expect(parseRoute(pattern, '/demo', '?q=button&size=200')).to.deep.equal({
      params: {},
      queryParams: { q: 'button', size: '200' },
    });
  });

  it('parse path params ', () => {
    const pattern = '/demo/:id(/)';
    expect(parseRoute(pattern, '/demo/2')).to.deep.equal({ params: { id: '2' }, queryParams: {} });
  });

  it('decodes special characters ', () => {
    const pattern = '/demo/:id(/)';
    expect(parseRoute(pattern, '/demo/2', '?email=j%40gmail')).to.deep.equal({
      params: { id: '2' },
      queryParams: { email: 'j@gmail' },
    });
  });

  it('returns null when no match', () => {
    const pattern = '/users/:id(/)';
    assert(!parseRoute(pattern, '/bidule'));
  });
});