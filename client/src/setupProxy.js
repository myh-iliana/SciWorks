const createProxy = require('http-proxy-middleware');

const proxy = createProxy({
  target: 'http://localhost:3001/',
  pathRewrite: {
    '^/api': '',
  },
  changeOrigin: true,
});

module.exports = (app) => {
  app.use('/api', proxy);
};
