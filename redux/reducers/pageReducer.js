import { SAVE_MEAL, LOAD_COOKIE } from '../actions/pageActions';
import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.newMeal],
      };
    case LOAD_COOKIE:
      return { ...state, meals: action.cookie };
    default:
      return { ...state };
  }
};

export default pageReducer;
