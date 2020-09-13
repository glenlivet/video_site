module.exports = {
  mode: "development",

  entry: {
    main: "./src/web/frontend/main.tsx",
  },

  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    path: __dirname + "/dist/web/frontend",
    publicPath: "/assets/",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        loader: "less-loader", // compiles Less to CSS
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    usedExports: true,
  },
};
