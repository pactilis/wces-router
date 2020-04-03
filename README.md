# \<wces-router>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i @wces/router
```

## Example Usage
```html
<script type="module">
  import { html, render } from "lit-html";
  import './wces-router.js';
  import './demo/app-page1.js';

  const routes = [
    {
      id: 'page1',
      pattern: '(/)',
      component: 'app-page1'
    },
    {
      id: 'page2',
      pattern: '/page2/:name',
      component: 'app-page2',
      url: '/demo/app-page2.js',
      context: async ({params: { name }}) => ({ greeting: `Hello ${name}`})
    }
  ];
  const route404 = {
    id: 'route404',
    component: 'app-404',
    url: '/demo/app-404.js'
  }

  window.addEventListener('load', () => {
    const rootEl = document.getElementById('demo');

    render(
      html`<wces-router .routes="${routes}" .route404="${route404}"></wces-router>`,
      rootEl
    );
  })
</script>

<div id="demo"></div>
```

## Features

### Lazy loading
  ...

### Route path params and query params
  ...

### Optional 404 route
  ...

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `index.html`
