import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import productReducer from './productReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

// export ourDepartments
export default combineReducers({
    products: productReducer,
    authentication: authReducer,
    order: orderReducer,
    form: formReducer
});