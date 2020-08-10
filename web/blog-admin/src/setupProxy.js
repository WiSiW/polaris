const { createProxyMiddleware } = require('http-proxy-middleware')
const options = {
    target: 'http://localhost:8090', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path', // remove base path
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'http://dev.weisw.cn': 'http://localhost:8090',
    },
};
module.exports = function(app) {
    app.use('/api', createProxyMiddleware(options));
    app.listen(8070);
}
