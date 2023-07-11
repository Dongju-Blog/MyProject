/** @type {import('next').NextConfig} */
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

}

module.exports = nextConfig
