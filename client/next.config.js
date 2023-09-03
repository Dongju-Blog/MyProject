/** @type {import('next').nextConfig} */

// module.exports = nextConfig

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8081/api/:path*"
        // destination: "https://server.dj-blog.com/api/:path*",
      },
    ];
  },



};

// const removeImports = require('next-remove-imports')({

// })

// module.exports = () => {
//   const plugins = [removeImports];
//   const config = plugins.reduce((acc, next) => next(acc), {
//     ...nextConfig,
//   });
//   return config;
// };

module.exports = nextConfig;
