import { UPDATE_MEALS } from '../actions/pageActions';
import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MEALS:
      return {
        ...state,
        meals: action.meals,
      };
    default:
      return { ...state };
  }
};

export default pageReducer;
