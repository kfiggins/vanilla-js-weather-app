export const createStore = ({ initialState }) => {
  let state = initialState;
  const getState = () => {
    return state;
  };

  const merge = (newState) => {
    state = {
      ...state,
      ...newState,
    };
  };

  const reset = () => {
    state = initialState;
  };

  return { getState, merge, reset };
};
