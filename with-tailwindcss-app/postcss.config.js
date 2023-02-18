module.exports = {
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
};