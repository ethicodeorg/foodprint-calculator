import FrontEnglish from '../public/static/locales/en/index.json';
import AboutEnglish from '../public/static/locales/en/about.json';
import OtherEnglish from '../public/static/locales/en/common.json';
import FrontIcelandic from '../public/static/locales/is/index.json';
import AboutIcelandic from '../public/static/locales/is/about.json';
import OtherIcelandic from '../public/static/locales/is/common.json';
import FrontItalian from '../public/static/locales/it/index.json';
import AboutItalian from '../public/static/locales/it/about.json';
import OtherItalian from '../public/static/locales/it/common.json';
import FrontFrench from '../public/static/locales/fr/index.json';
import AboutFrench from '../public/static/locales/fr/about.json';
import OtherFrench from '../public/static/locales/fr/common.json';
import FrontPortuguese from '../public/static/locales/pt/index.json';
import AboutPortuguese from '../public/static/locales/pt/about.json';
import OtherPortuguese from '../public/static/locales/pt/common.json';

export function getTranslationJSON(lang, index) {
  const filesMap = {
    en: {
      0: FrontEnglish,
      1: AboutEnglish,
      2: OtherEnglish,
    },
    is: {
      0: FrontIcelandic,
      1: AboutIcelandic,
      2: OtherIcelandic,
    },
    it: {
      0: FrontItalian,
      1: AboutItalian,
      2: OtherItalian,
    },
    fr: {
      0: FrontFrench,
      1: AboutFrench,
      2: OtherFrench,
    },
    pt: {
      0: FrontPortuguese,
      1: AboutPortuguese,
      2: OtherPortuguese,
    },
  };

  return filesMap[lang][index];
}

export function getFileNameByIndex(index) {
  const fileNameMap = {
    0: 'index',
    1: 'about',
    2: 'common',
  };

  return fileNameMap[index];
}

export function getSubmitTextByIndex(index) {
  const submitTextMap = {
    0: 'Front Page',
    1: 'About Page',
    2: 'Other',
  };

  return `Download ${submitTextMap[index]} translations`;
}

export function getUploadTextByIndex(index) {
  const fileName = getFileNameByIndex(index);
  return `Upload ${fileName}.json`;
}

export function splitTranslationWithLink(translation) {
  const translationArr = translation.split('{{link_start}}');
  const beforeLink = translationArr[0];
  const firstSplitArr = translationArr[1].split('{{link_end}}');
  const linkText = firstSplitArr[0];
  const afterLink = firstSplitArr[1];
  const secondSplitArr = translationArr[2]?.split('{{link_end}}');
  const linkText2 = secondSplitArr?.[0];
  const afterLink2 = secondSplitArr?.[1];

  return {
    beforeLink,
    linkText,
    afterLink,
    linkText2,
    afterLink2,
  };
}

export const SPLITTER = {
  link_start: '{{link_start}}',
  link_end: '{{link_end}}',
};
