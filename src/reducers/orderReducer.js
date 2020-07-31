import {ADD_ORDER, DELETE_ORDER, SEND_ORDERS} from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case ADD_ORDER:
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
                var newState = state.map(prod => {
                    if(prod.id === action.payload.id){
                        const newQuantity = prod.quantity + action.payload.quantity;
                        return {...action.payload, quantity: newQuantity};
                    } 
                    else
                        return prod;
                });

                return newState;
            }
            // add it
            else {
                return [...state, action.payload];
            }
        case DELETE_ORDER:
            return state.filter(order => order.id !== action.payload);
        case SEND_ORDERS:
            return [];
        default:
            return state;
    }
    
}