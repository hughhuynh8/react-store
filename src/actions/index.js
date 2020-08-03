import jsonPlaceholder from '../apis/products';
import {FETCH_PRODUCT, FETCH_PRODUCTS, SIGN_IN, SIGN_OUT, ADD_ORDER, DELETE_ORDER, SEND_ORDERS, OPEN_CART, CLOSE_CART } from './types';

// AUTHENTICATION
export const signIn = (userId) => { 
    return {
        type: SIGN_IN,
        payload: {isSignedIn: true, user: userId}
    }
}

export const signOut = () => { 
    return {
        type: SIGN_OUT,
        payload: {isSignedIn: false, user: ''}
    }
}

// PRODUCT
export const fetchProducts = () => { 
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/products');
        
        dispatch({
            type: FETCH_PRODUCTS,
            payload: response.data
        });
    }
};

export const fetchProduct = (id) => { 
    return async (dispatch) => {
        const response = await jsonPlaceholder.get(`/products/${id}`);
        
        dispatch({
            type: FETCH_PRODUCT,
            payload: response.data
        });
    }
};

// ORDERS
export const addOrder = (order) => { 
    return {
        type: ADD_ORDER,
        payload: order
    }
};

export const deleteOrder = (orderId) => { 
    return {
        type: DELETE_ORDER,
        payload: orderId
    }
};

export const sendOrders = (orders) => { 
    return async (dispatch, getState) => {
        const { userId } = getState().auth; // get UserId from Auth reducer so when we create a new stream, we can insert the User for that stream
        
        // TODO: write code to send orders to Firebase
        const response = await jsonPlaceholder.post('/orders');
        
        dispatch({
            type: SEND_ORDERS,
            payload: {...response.data, userId: userId }
        });
    }
};

// CART
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