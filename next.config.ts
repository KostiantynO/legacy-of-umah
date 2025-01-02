// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 10,
    staticGenerationMinPagesPerWorker: 10,
  },
};

export default nextConfig;
