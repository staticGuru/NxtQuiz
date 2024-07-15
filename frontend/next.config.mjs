/** @type {import('next').NextConfig} */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

const buildDateTime = getCurrentDateTime();

const nextConfig = {
  distDir: 'build',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // enforce adding date-time to the output filename to avoid caching issues
      config.output.filename = `static/js/[name].[contenthash:8].${buildDateTime}.js`;
      config.output.chunkFilename = `static/js/[name].[contenthash:8].${buildDateTime}.js`;

      // Remove all existing instances of MiniCssExtractPlugin
      config.plugins = config.plugins.filter(
        (plugin) => !(plugin instanceof MiniCssExtractPlugin),
      );

      // Add a new MiniCssExtractPlugin instance with custom filename pattern
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: `static/css/[name].[contenthash:8].${buildDateTime}.css`,
          chunkFilename: `static/css/[name].[contenthash:8].${buildDateTime}.css`,
        }),
      );

      // Modify CSS rules to use the custom MiniCssExtractPlugin instance
      config.module.rules.forEach((rule) => {
        if (Array.isArray(rule.use)) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes('mini-css-extract-plugin')) {
              use.loader = MiniCssExtractPlugin.loader;
            }
          });
        }
      });

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_DATETIME': JSON.stringify(buildDateTime),
        }),
      );
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/signup/country',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
