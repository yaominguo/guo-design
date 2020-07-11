const path = require('path')
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  webpackFinal: async config => {
    await config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            tsconfigPath: path.join(__dirname, '../tsconfig.json'),
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes("node_modules")
              }
              return true
            },
            shouldExtractLiteralValuesFromEnum: true,
          }
        }
      ]
    });

    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
