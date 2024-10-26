/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  transpilePackages: ["@multiversx/sdk-dapp"],
  webpack: (config: any) => {
    config.resolve.fallback = { fs: false };
    config.externals.push("pino-pretty", "lokijs", "encoding", {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });

    return config;
  },
};

module.exports = nextConfig;