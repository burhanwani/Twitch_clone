import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// the compose and applyMiddleware are used for redux devtools
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import App from './components/App';
// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware())
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);