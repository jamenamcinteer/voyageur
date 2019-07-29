module.exports = {
  staticFileGlobs: [
    "build/**/*.{html,png,jpg,gif,svg}",
    "build/manifest.json",
    "build/static/**/!(*map*)"
  ],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  swFilePath: "./build/service-worker.js",
  stripPrefix: "build/",
  navigateFallback: "/index.html",
  navigateFallbackWhitelist: [/^\/trip\//, /^\/login\//],
  runtimeCaching: [
    {
      urlPattern: "'/'",
      handler: "networkFirst"
    },
    {
      urlPattern: "/auth/",
      handler: "networkFirst"
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
    },
    {
      urlPattern: /^https:\/\/lh5\.googleusercontent\.com\//,
      handler: "networkFirst"
    },
    {
      urlPattern: /^https:\/\/images\.unsplash\.com\//,
      handler: "networkFirst"
    }
  ]
};
