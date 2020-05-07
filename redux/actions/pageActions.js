export const SAVE_MEAL = 'SAVE_MEAL';

export const saveNewMeal = (newMeal) => {
  return { type: SAVE_MEAL, newMeal };
};
