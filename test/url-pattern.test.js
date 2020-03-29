// @ts-nocheck
import { expect, assert } from '@open-wc/testing';
import { UrlPattern } from '../src/url-pattern.js';

describe('UrlPattern', () => {
  it('matches simple url', () => {
    const pattern = new UrlPattern('/api/users');
    const result = pattern.match('/api/users');
    expect(result).to.deep.equal({});
  });

  it('extracts path params', () => {
    const pattern = new UrlPattern('/api/users/:id');
    expect(pattern.match('/api/users/15')).to.deep.equal({ id: '15' });
  });

  it('rejects urls with missing parts', () => {
    const pattern = new UrlPattern('/api/users/:id');
    assert(!pattern.match('/api/users'));
  });

  it('accepts optional parts', () => {
    const pattern = new UrlPattern('/api/users(/:id)');
    expect(pattern.match('/api/users')).to.deep.equal({});
  });

  it('can parse multiple params', () => {
    const pattern = new UrlPattern('/api/users/:id/:subId');
    expect(pattern.match('/api/users/4/3')).to.deep.equal({ id: '4', subId: '3' });
  });

  it('does not tolerate leading slash', () => {
    const pattern = new UrlPattern('/api/users/:id');
    assert(!pattern.match('/api/users/4/'));
  });

  it('can tolerate leading slash', () => {
    const pattern = new UrlPattern('/api/users/:id(/)');
    expect(pattern.match('/api/users/4/')).to.deep.equal({ id: '4' });
    expect(pattern.match('/api/users/4')).to.deep.equal({ id: '4' });
  });
});