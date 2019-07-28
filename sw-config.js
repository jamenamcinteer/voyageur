module.exports = {
  staticFileGlobs: [
    "build/**/*.{html,js,css,png,jpg,gif,svg}",
    "build/manifest.json",
    "build/static/**/!(*map*)"
  ],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  runtimeCaching: [
    {
      urlPattern: "'/'",
      handler: "networkFirst"
    },
    {
      urlPattern: "/auth/google/",
      handler: "networkOnly"
    },
    {
      urlPattern: "/auth/",
      handler: "networkOnly"
    },
    {
      urlPattern: "/api/",
      handler: "networkFirst"
    },
    {
      urlPattern: "/ping/",
      handler: "networkOnly"
    },
    {
      urlPattern: "/photos/",
      handler: "networkFirst"
    }
  ]
};
