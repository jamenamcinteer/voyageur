module.exports = {
  staticFileGlobs: [
    "build/*.html",
    "build/manifest.json",
    "build/static/**/!(*map*)"
  ],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  runtimeCaching: [
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
