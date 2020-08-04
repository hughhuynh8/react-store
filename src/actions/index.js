import jsonPlaceholder from '../apis/products';
import {FETCH_PRODUCT, FETCH_PRODUCTS, SIGN_IN, SIGN_OUT, ADD_ORDER, DELETE_ORDER, SEND_ORDERS, OPEN_CART, CLOSE_CART, CLEAR_ORDERS } from './types';
const database = window.firebase.database();

// AUTHENTICATION
export const signIn = ({userName, email}) => { 
    return {
        type: SIGN_IN,
        payload: {isSignedIn: true, userName, email}
    }
}

export const signOut = () => { 
    return {
        type: SIGN_OUT,
        payload: {isSignedIn: false, userName: '', email: ''}
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

export const clearOrders = () => { 
    return {
        type: CLEAR_ORDERS,
        payload: null
    }
};

export const sendOrders = (orders) => { 
    return async (dispatch, getState) => {
        const { userName, email } = getState().authentication; // get user details from Authentication reducer so when we create a new order, 
                                                               // we can insert the userName and email for that order
        
        var newOrderRef = database.ref("orders").push();
        var newOrder = {...orders, userName, email};
        console.log('sending order: ', newOrder);

        const response = await newOrderRef.set(newOrder);
        
        dispatch({
            type: SEND_ORDERS,
            payload: response
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