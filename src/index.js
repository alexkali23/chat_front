import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {ToastsContainer, ToastsStore} from 'react-toasts';



import App from './components/app';
import reducers from './redux_logic/reducers';

export const store = createStore(reducers, applyMiddleware(thunk));




function sayStore(){
  console.log(store.getState())
}
setTimeout((sayStore), 1000);


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <ToastsContainer store={ToastsStore}/>
        </Provider>
    </BrowserRouter>
  , document.querySelector('#root'));