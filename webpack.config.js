const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');


//for hot-loading with webpack-dev-server
const TARGET = process.env.npm_lifecycle_event


const PATHS = {
  //path to top-level file.
  app: path.join(__dirname, 'app'),
  //specifies the path where bundle.js will be written
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // `test` is a test condition that causes the loader to be applied when a
        // filename passes. In this case, when any filename contains either `.js` or `.jsx`
        // as its terminating characters, this loader will be applied.
        test: /\.jsx?$/,

        // `exclude` lets you specify tests that, when passed by a filename, cause those
        // files to *not* be transformed by the loader. There's also an `include` option
        // that works in the inverse way.
        exclude: /(node_modules|bower_components)/,

        // `loader` names the actual loader that is to be applied. In this case,
        // this object requires 'babel-loader' to do the transformation.
        // We could actually apply multiple loaders here by using the property `loaders`
        // instead of `loader`, which takes an array of loader names.
        //
        // When you're declaring loaders in this field, you can leave off the `-loader` part
        // of the package name. Webpack will interpret `babel` as `babel-loader` here,
        // `coffee` as `coffee-loader`, etc. But you can also just write out `babel-loader`,
        // if you prefer.
        loader: 'babel',

        // `query` lets you pass options to the loader's process. The options that a loader takes
        // are specific to each loader. In this case, `babel-loader` is being told to use the 'react'
        // and 'es2015' presets when it transforms files. `query` becomes a query string, similar
        // to what you see in request URLs, and the same thing could be achieved by writing this above:
        // loader: 'babel?presets[]=react,presets[]=es2015'
        query: {
          presets: ['react', 'es2015'],
        }
      },
    ]
  }
};

//For Hot-Loading
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
      devServer: {
        contentBase: PATHS.build,

        // Enable history API fallback so HTML5 History API based
        // routing can be used as a default
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env so this is easy to customize.
        host: process.env.HOST,
        port: process.env.PORT
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
    });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
