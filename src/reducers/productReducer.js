import { FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT_ERROR, FETCH_PRODUCTS_ERROR, CLEAR_PRODUCT_ERROR } from '../actions/types'

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
                    return state.map(prod => (prod.id === action.payload.id) ? action.payload : prod);
                }
                // add it
                else {
                    return [...state, action.payload];
                }
            case FETCH_PRODUCT_ERROR:
                return [...state, action.payload];
            case FETCH_PRODUCTS:
                  return action.payload;
            case FETCH_PRODUCTS_ERROR:
                return [...state, action.payload];
            case CLEAR_PRODUCT_ERROR:
                const newState = state.filter(prod => {
                    return (prod.message === undefined);
                });
                return newState;
            default:
                  return state;
      }
};