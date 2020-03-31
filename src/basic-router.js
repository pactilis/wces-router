export default {
  navigate(url) {
    window.history.pushState({}, '', url);
    return Promise.resolve();
  },
};
