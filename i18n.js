const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');

module.exports = new NextI18Next({
  otherLanguages: ['is', 'fr', 'it', 'pt', 'de'],
  localeSubpaths: {
    is: 'is',
    en: 'en',
    fr: 'fr',
    it: 'it',
    pt: 'pt',
    de: 'de',
  },
  localePath: path.resolve('./public/static/locales'),
});
