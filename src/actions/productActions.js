import jsonPlaceholder from '../apis/products';
import { FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT_ERROR, FETCH_PRODUCTS_ERROR, CLEAR_PRODUCT_ERROR } from './types';

export const fetchProducts = () => { 
    return async (dispatch) => {
        try {
            const response = await jsonPlaceholder.get('/products');
            
            dispatch({
                type: FETCH_PRODUCTS,
                payload: response.data
            });
        }
        catch(err) {
            dispatch({
                type: FETCH_PRODUCTS_ERROR,
                payload: {message: err.message}
            });
        }
    }
};

export const fetchProduct = (id) => { 
    return async (dispatch) => {
        try {
            const response = await jsonPlaceholder.get(`/products/${id}`);

            dispatch({
                type: FETCH_PRODUCT,
                payload: response.data
            });
        }
        catch(err) {
            dispatch({
                type: FETCH_PRODUCT_ERROR,
                payload: {message: err.message}
            });
        }
    }
};

export const clearProductError = () => { 
    return {
        type: CLEAR_PRODUCT_ERROR,
        payload: {}
    }
}