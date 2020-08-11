import { ADD_ORDER, DELETE_ORDER, CLEAR_ORDERS, SEND_ORDERS, SEND_ORDERS_ERROR } from './types';

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

        var newOrder = {...orders, userName, email, date: new Date()};
        console.log('sending order: ', newOrder);

        // send to Firebase
        firestore.collection("orders").add(newOrder)
            .then(() => {
                console.log("Firebase order sent successfully");
                dispatch({
                    type: SEND_ORDERS,
                    payload: {message: "Your order has been sent.", hasResponse: true, isSuccess: true}
                });
            })
            .catch(err => {
                console.log("Firebase order send error:", err);
                dispatch({
                    type: SEND_ORDERS_ERROR,
                    payload: {...err, hasResponse: true, isSuccess: false}
                });
            });
    }
};
