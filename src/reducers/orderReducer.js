import {ADD_ORDER, DELETE_ORDER, SEND_ORDERS} from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case ADD_ORDER:
            return [...state, action.payload];
        case DELETE_ORDER:
            return state.filter(order => order.id !== action.payload);
        case SEND_ORDERS:
            return [];
        default:
            return state;
    }
    
}