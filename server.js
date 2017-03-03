var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}).listen(3000, '0.0.0.0', (err, result)=> {
    if (err) {
        console.log(err);
    }

    console.log('Your application is served: http://0.0.0.0:3000');
});
