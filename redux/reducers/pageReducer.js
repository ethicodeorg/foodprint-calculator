import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REMOVE_MEAL_FROM_COMPARISONS':
      return {
        ...state,
        comparisons: state.comparisons.filter((comparisonId) => comparisonId !== action.mealId),
      };
    case 'ADD_MEAL_TO_COMPARISONS':
      return {
        ...state,
        comparisons: [...state.comparisons, action.mealId],
      };
    default:
      return { ...state };
  }
};

export default pageReducer;
