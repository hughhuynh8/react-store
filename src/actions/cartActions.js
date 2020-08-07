import { OPEN_CART, CLOSE_CART } from './types';

export const openCart = () => { 
    return {
        type: OPEN_CART,
        payload: {isCartOpen: true}
    }
};
export const closeCart = () => { 
    return {
        type: CLOSE_CART,
        payload: {isCartOpen: false}
    }
};