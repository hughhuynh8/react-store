import { OPEN_CART, CLOSE_CART } from '../actions/types';

export default (state = {isCartOpen: false}, action) => { 
      switch( action.type ) {
            case OPEN_CART:
                  return {...state, isCartOpen: action.payload.isCartOpen };
            case CLOSE_CART:
                  return {...state, isCartOpen: action.payload.isCartOpen };
            default:
                  return state;
      }
};