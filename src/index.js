import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { loadState, saveState } from './localStorage';

// local storage (persistent cart)
const persistedState = loadState();

// redux debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// redux store (setting the initial redux state to persistedState, from localStorage)
const store = createStore(reducers, {...persistedState}, composeEnhancers(applyMiddleware(thunk)));

// save order to local storage
// throttle ensures that even if lots of changes are made, at most, it saves just once a second 
store.subscribe(throttle(() => {
  saveState({
    order: store.getState().order
  });
}, 1000));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
