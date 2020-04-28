import { LOAD_FOOD_DATA, getFoodData } from '../actions/pageActions';
import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FOOD_DATA:
      return state.set('foodData', action.foodData);
    default:
      return { ...state };
  }
};

export default pageReducer;
