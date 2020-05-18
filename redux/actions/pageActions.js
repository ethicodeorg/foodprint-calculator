import store from 'store';

export const UPDATE_MEALS = 'UPDATE_MEALS';

function createUniqueId(newMeal) {
  const randomThreeLetters = [0, 1, 2]
    .map((i) => String.fromCharCode(Math.floor(Math.random() * 25 + 97)))
    .reduce((pre, curr) => pre + curr, '');
  const id = `${newMeal.title} ${randomThreeLetters}`
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^A-Za-z0-9-]/g, '')
    .replace(/-+/, '-');

  return id;
}

export function addMeal(newMeal) {
  return (dispatch, getState) => {
    const meals = getState().meals;
    newMeal.id = createUniqueId(newMeal);
    const updatedMeals = [...meals, newMeal];

    store.set('meals', updatedMeals);
    dispatch({ type: UPDATE_MEALS, meals: updatedMeals });
  };
}

export function deleteMeal(mealId) {
  return (dispatch, getState) => {
    const meals = getState().meals;
    const oldEntryIndex = meals.indexOf(meals.find((m) => m.id === mealId));

    if (oldEntryIndex > -1) {
      meals.splice(oldEntryIndex, 1);
    }

    store.set('meals', meals);
    dispatch({ type: UPDATE_MEALS, meals });
  };
}

export function editMeal(mealId, updatedMeal) {
  return (dispatch, getState) => {
    const meals = getState().meals;
    const oldEntryIndex = meals.indexOf(meals.find((m) => m.id === mealId));

    if (oldEntryIndex > -1) {
      meals.splice(oldEntryIndex, 1);
    }

    updatedMeal.id = createUniqueId(updatedMeal);
    const updatedMeals = [...meals, updatedMeal];

    store.set('meals', updatedMeals);
    dispatch({ type: UPDATE_MEALS, meals: updatedMeals });
  };
}
