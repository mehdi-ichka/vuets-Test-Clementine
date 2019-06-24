module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /.html$/,
            loader: "vue-template-loader",
            exclude: /index.html/
          },
          {
            test: /\.scss$/,
            use: [
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ],
        }
        ]
      }
    }
  }