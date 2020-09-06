export function splitTranslationWithLink(translation) {
  const translationArr = translation.split('|');

  return {
    beforeLink: translationArr[0],
    linkText: translationArr[1],
    afterLink: translationArr[2],
    linkText2: translationArr[3],
    afterLink2: translationArr[4],
  };
}
