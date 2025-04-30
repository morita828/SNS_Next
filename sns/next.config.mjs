// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // App Routerを使っている場合
  },
  // 追加設定が必要であればここに書きます
};

export default nextConfig;
