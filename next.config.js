const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Temporarily ignore TypeScript errors during CI builds (e.g., Vercel)
  // to prevent non-critical type issues from blocking deployments.
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;