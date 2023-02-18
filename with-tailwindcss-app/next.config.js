/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Other Next.js options
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: [
                'postcss-flexbugs-fixes',
                'postcss-preset-env',
                [
                  'tailwindcss',
                  {
                    // You can specify other options here, such as your custom theme or variants
                  },
                ],
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

