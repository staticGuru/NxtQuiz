/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-prefix-selector': {
      prefix: '.simplestudy-react-component',
      transform: (prefix, selector, prefixedSelector) => {
        if (selector.startsWith('body')) {
          return selector.replace('body', prefix);
        }
        return prefixedSelector;
      },
    },
  },
};

export default config;
