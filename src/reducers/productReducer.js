import {FETCH_PRODUCT, FETCH_PRODUCTS} from '../actions/types'

export default (state = [], action) => { 
      switch( action.type ) {
            case FETCH_PRODUCT:
                // does Product ID already exist
                const prodExists = state.find(prod => {
                    if(prod.id === action.payload.id) {
                        return true;
                    }
                    else 
                        return false;
                });

                // replace it
                if(prodExists) {
                    var newState = state.map(prod => (prod.id === action.payload.id) ? action.payload : prod);
                    return newState;
                }
                // add it
                else {
                    return [...state, action.payload];
                }
            case FETCH_PRODUCTS:
                  return action.payload;
            default:
                  return state;
      }
};