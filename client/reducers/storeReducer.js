const initialState = {};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return action.payload;
    default:
      return state;
  }
};

export default storeReducer;

