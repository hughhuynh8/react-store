import { SIGN_IN, SIGN_OUT, SIGN_IN_ERROR, SIGN_OUT_ERROR } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null, 
    userName: null,
    email: null
};

export default (state = INITIAL_STATE, action) => { 
      switch( action.type ) {
            case SIGN_IN:
                  return {...state, ...action.payload };
            case SIGN_IN_ERROR:
                  return {...state, ...action.payload };
            case SIGN_OUT:
                  return {...state, ...action.payload};
            case SIGN_OUT_ERROR:
                  return {...state, ...action.payload};
            default:
                  return state;
      }
};