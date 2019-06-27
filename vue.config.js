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
                "sass-loader", // compiles Sass to CSS, using Node Sass by default
                {
                  loader: "sass-resources-loader",
                  // options: {
                  //     resources: [
                  //         helpers.root("../node_modules/bootstrap/scss/_functions.scss"),
                  //         helpers.root("../node_modules/bootstrap/scss/_variables.scss"),
                  //         helpers.root("../node_modules/bootstrap/scss/_mixins.scss")
                  //     ]
                  // }
                }
            ],
        }
        ]
      }
    }
  }