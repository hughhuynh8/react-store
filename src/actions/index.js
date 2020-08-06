import jsonPlaceholder from '../apis/products';
import {FETCH_PRODUCT, FETCH_PRODUCTS, SIGN_IN, SIGN_OUT, ADD_ORDER, DELETE_ORDER, SEND_ORDERS, SEND_ORDERS_ERROR, OPEN_CART, CLOSE_CART, CLEAR_ORDERS } from './types';

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
    return async (dispatch, getState, { getFirebase }) => {
        const { userName, email } = getState().authentication; // get user details from Authentication reducer so when we create a new order, 
                                                               // we can insert the userName and email for that order
        const firestore = getFirebase().firestore();

        var newOrder = {...orders, userName, email};
        console.log('sending order: ', newOrder);

        firestore.collection("orders").add(newOrder)
            .then(() => {
                dispatch({
                    type: SEND_ORDERS,
                    payload: newOrder
                });
            })
            .catch(err => {
                dispatch({
                    type: SEND_ORDERS_ERROR,
                    payload: err
                });
            });
        // TODO: send to firebase
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