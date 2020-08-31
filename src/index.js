import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/firebaseConfig';
import swDev from './swDev';

import { loadState, saveState } from './localStorage';  // to save our cart into localStorage 

// load cart from local storage (if it exists in localStorage)
const persistedState = loadState();

// redux debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// redux store (setting the initial redux state to persistedState, from localStorage)
const store = createStore(
  reducers,
  {...persistedState},
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

// save order to local storage
// throttle ensures that even if lots of changes are made, at most, it saves just once a second 
store.subscribe(throttle(() => {
  saveState({
    authentication: store.getState().authentication,
    order: store.getState().order
  });
}, 1000));

// Firebase
const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
  document.getElementById('root')
);

// register service worker
swDev();