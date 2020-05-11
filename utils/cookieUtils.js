export function getCookie(cookieName, cookies) {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(cookies);
  const cookieArr = decodedCookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    let c = cookieArr[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '[]';
}

/**
 * Multipurpose function!
 * 1. Add new meal: Pass undefined to `oldMeal` and the new meal to `newMeal`
 * 2. Edit meal: Pass the meal to edit to `oldMeal` and edited meal to `newMeal`
 * 3. Delet meal: Pass the meal to delete to `oldMeal` and undefined to `newMeal`
 * @param {Object} document
 * @param {Object | undefined} oldMeal optional
 * @param {Object | undefined} newMeal optional
 */
export function setCookie(document, oldMeal, newMeal) {
  // Get the old cookie
  const cookie = JSON.parse(getCookie('meals', document.cookie));

  // Remove the old meal from the cookie if it exists
  if (oldMeal) {
    const oldEntryIndex = cookie.indexOf(cookie.find((c) => c.id === oldMeal.id));
    if (oldEntryIndex > -1) {
      cookie.splice(oldEntryIndex, 1);
    }
  }

  // Add the new meal to the user cookie if needed
  const newCookie = newMeal ? [...cookie, newMeal] : cookie;
  document.cookie = `meals=${JSON.stringify(newCookie)}; path=/`;
}
