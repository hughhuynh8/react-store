import { combineReducers } from 'redux';
import productReducer from './productReducer';

// export ourDepartments
export default combineReducers({
    products: productReducer
});