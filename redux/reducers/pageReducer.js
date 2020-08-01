import { getInitialState } from './ititialState';

const initialState = getInitialState();

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default pageReducer;
