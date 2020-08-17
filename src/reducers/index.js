import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import productReducer from './productReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import modalReducer from './modalReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

// export ourDepartments
export default combineReducers({
    products: productReducer,
    authentication: authReducer,
    order: orderReducer,
    form: formReducer,
    modal: modalReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});