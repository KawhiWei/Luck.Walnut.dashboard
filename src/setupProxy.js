const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/walnut', {
        //target: "http://localhost:5099",    // 目标路径
        target: "http://39.101.165.187:9000", 
        changeOrigin: true
    }));
    app.use(createProxyMiddleware('/dove', {
        target: "http://localhost:5079",    // 目标路径
        changeOrigin: true
    }))
    app.use(createProxyMiddleware('/kube', {
        target: "http://localhost:5004",    // 目标路径
        changeOrigin: true
    }))
}