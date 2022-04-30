const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/walnut', {
        target: "http://localhost:5099",    // 目标路径
        changeOrigin: true
    })
    )
}