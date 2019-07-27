module.exports = {
  runtimeCaching: [
    {
      urlPattern: "/auth",
      handler: "networkFirst"
    },
    {
      urlPattern: "/api",
      handler: "networkFirst"
    },
    {
      urlPattern: "/ping",
      handler: "networkFirst"
    },
    {
      urlPattern: "/photos",
      handler: "networkFirst"
    }
  ]
};
