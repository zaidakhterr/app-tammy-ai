module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/folder",
        destination: "/",
      },
      {
        source: "/summary",
        destination: "/",
      },
    ];
  },
};
