import { SIGN_IN } from './../types/SIGN_IN';

const initialState = {
  userId: '',
  userName: 'Babatunde'
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default userReducer;
