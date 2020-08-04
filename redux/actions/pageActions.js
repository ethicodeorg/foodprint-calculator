export function removeMealFromComparisons(mealId) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_MEAL_FROM_COMPARISONS', mealId });
  };
}

export function addMealToComparisons(mealId) {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_MEAL_TO_COMPARISONS', mealId });
  };
}
