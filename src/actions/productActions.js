import jsonPlaceholder from '../apis/products';
import { FETCH_PRODUCT, FETCH_PRODUCTS } from './types';

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