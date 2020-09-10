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
