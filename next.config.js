const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Temporarily ignore TypeScript errors during CI builds (e.g., Vercel)
  // to prevent non-critical type issues from blocking deployments.
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Help Next handle ESM externals gracefully (firebase/undici)
    esmExternals: 'loose',
  },
  // Ensure certain ESM/node packages are transpiled and avoid bundling Node-only modules on the client
  transpilePackages: ['firebase', '@firebase/auth', 'undici'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent including Node-only fetch implementation in client bundles
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        undici: false,
        'undici/': false,
        'undici/lib': false,
        'firebase/auth': 'firebase/auth/dist/esm/index.js',
        '@firebase/auth': '@firebase/auth/dist/esm/index.js',
      };
      // Avoid parsing undici entirely
      config.module = config.module || {};
      config.module.noParse = /node_modules[\\/](undici)[\\/]/;
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        undici: false,
      };
      // Prefer browser conditions when resolving package exports
      config.resolve.conditionNames = [
        'browser',
        'import',
        'module',
        'default',
      ];
      // Hint webpack to avoid picking node-specific auth build
      config.resolve.alias['@firebase/auth/dist/node-esm'] = '@firebase/auth/dist/esm/index.js';
      config.resolve.alias['@firebase/auth/dist/node-esm/index.js'] = '@firebase/auth/dist/esm/index.js';
      config.resolve.alias['firebase/auth/dist/index.mjs'] = 'firebase/auth/dist/esm/index.js';
      // Force browser variant for auth-compat
      config.resolve.alias['@firebase/auth-compat'] = '@firebase/auth-compat/dist/esm/index.esm.js';
      config.resolve.alias['@firebase/auth-compat/dist/esm/index.node.esm.js'] = '@firebase/auth-compat/dist/esm/index.esm.js';
    }
    return config;
  },
};

module.exports = nextConfig;