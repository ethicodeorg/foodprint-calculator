export const SAVE_MEAL = 'SAVE_MEAL';
export const LOAD_COOKIE = 'LOAD_COOKIE';

export const saveNewMeal = (newMeal) => {
  return { type: SAVE_MEAL, newMeal };
};

export const loadCookieToState = (cookie) => {
  return { type: LOAD_COOKIE, cookie };
};
