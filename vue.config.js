module.exports = {
    chainWebpack: config => {
        // ...other chains
        config.module // fixes https://github.com/graphql/graphql-js/issues/1272
            .rule('mjs$')
            .test(/\.mjs$/)
            .include
            .add(/node_modules/)
            .end()
            .type('javascript/auto');
    },
    configureWebpack: {
        resolve: {
            // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
            extensions: ['*', '.mjs', '.js', '.vue', '.json']
        }
    },
    devServer: {
        port: 8020, // 本机端口号
        host: 'localhost', // 本机主机名
        https: false, // 协议
        open: true, // 启动服务器时自动打开浏览器访问
        proxy: {
            '/api': {
                // 目标服务器,代理访问到http://localhost:8888
                target: 'http://localhost:9090',
                changOrigin: true, // 开启代理
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}

