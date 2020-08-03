import {ADD_ORDER, DELETE_ORDER, SEND_ORDERS} from '../actions/types';

export default (state = {products: [], total: 0}, action) => {
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

                return {...state, products: newStateProducts, total: (state.total + additionalCost)};
            }
            // product doesn't exists -> add it
            else {
                return {...state, products: [...state.products, action.payload], total: (state.total + action.payload.price * action.payload.quantity)};
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
            return {...state, products: newStateProducts, total: (state.total - subtractionalCost)};
        case SEND_ORDERS:
            return {...state, products: [], total: 0};
        default:
            return state;
    }
    
}