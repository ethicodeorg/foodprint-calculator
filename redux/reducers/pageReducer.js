import { SAVE_MEAL } from '../actions/pageActions';
import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.newMeal],
      };
    default:
      return { ...state };
  }
};

export default pageReducer;
