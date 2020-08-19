import { ADD_ORDER, DELETE_ORDER, CLEAR_ORDERS, CLEAR_MESSAGE, SEND_ORDERS, SEND_ORDERS_ERROR } from './types';

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

export const clearMessage = () => { 
    return {
        type: CLEAR_MESSAGE,
        payload: null
    }
};

export const sendOrders = (orders) => { 
    return async (dispatch, getState, { getFirebase }) => {
        const { userName, email } = getState().authentication; // get user details from Authentication reducer so when we create a new order, 
                                                               // we can insert the userName and email for that order
        const firestore = getFirebase().firestore();

        var newOrder = {products: orders.products, total: orders.total, userName, email, date: new Date()};
        console.log('sending order: ', newOrder);

        // send to Firebase
        try {
            const response = await firestore.collection("orders").add(newOrder);
            dispatch({
                type: SEND_ORDERS,
                payload: {message: `Your order has been sent with ID: ${response.id}`, hasResponse: true, isSuccess: true}
            });
        }
        catch(err) {
            dispatch({
                type: SEND_ORDERS_ERROR,
                payload: {error: err.message, hasResponse: true, isSuccess: false}
            });
        }
    }
};
