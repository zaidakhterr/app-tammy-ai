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
      {
        source: "/auth",
        destination: "/auth/login",
      },
    ];
  },
  images: {
    domains: ["picsum.photos"],
  },
};
