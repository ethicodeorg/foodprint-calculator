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

export function setUserCookie(document, userId = '') {
  document.cookie = `user=${userId}; path=/`;
}
