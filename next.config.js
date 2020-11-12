const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  is: 'is',
  en: 'en',
  fr: 'fr',
  it: 'it',
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};
