import { ADD_ORDER, DELETE_ORDER, CLEAR_ORDERS, CLEAR_MESSAGE, SEND_ORDERS, SEND_ORDERS_ERROR } from '../actions/types';

export default (state = {products: [], total: 0, hasResponse: false, message: ''}, action) => {
    switch(action.type) {
        case ADD_ORDER:
            // does Product ID already exist?
            const prodExists = state.products.find(prod => {
                if(prod.id === action.payload.id) {
                    return true;
                }
                else 
                    return false;
            });

            // product exists -> replace it
            if(prodExists) {
                let additionalCost = 0;
                let newStateProducts = state.products.map(prod => {
                    if(prod.id === action.payload.id){
                        const newQuantity = prod.quantity + action.payload.quantity;
                        // sub-cost of the product we're adding
                        additionalCost = prod.price * action.payload.quantity;
                        return {...action.payload, quantity: newQuantity};
                    } 
                    else
                        return prod;
                });

                return {...state, products: newStateProducts, total: (state.total + additionalCost), hasResponse: false, message: ''};
            }
            // product doesn't exists -> add it
            else {
                return {...state, products: [...state.products, action.payload], total: (state.total + action.payload.price * action.payload.quantity), hasResponse: false, message: ''};
            }
        case DELETE_ORDER:
            let subtractionalCost = 0;
            let newStateProducts = state.products.filter(order => {
                if(order.id !== action.payload){
                    return order;
                }
                else {
                    // sub-cost of the product we're removing
                    subtractionalCost = order.price * order.quantity;
                    return null;
                }
            });
            return {...state, products: newStateProducts, total: (state.total - subtractionalCost), hasResponse: false, message: ''};
        case CLEAR_ORDERS:
            return {...state, products: [], total: 0, hasResponse: false, isSuccess: null, message: ''};
        case CLEAR_MESSAGE:
            return {...state, hasResponse: false, isSuccess: null, message: ''};
        case SEND_ORDERS:
            return {...action.payload, products: [], total: 0};
        case SEND_ORDERS_ERROR:
            return {...state, ...action.payload};
        default:
            return state;
    }
    
}