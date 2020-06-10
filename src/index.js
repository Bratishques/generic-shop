import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import IndexPage from './Components/IndexPage';
import {Route} from './Components/Route';
import Cart from "./Components/Cart"
//import {Parse} from "./Components/Parse"
import {ADD_ITEM, REMOVE_ITEM, RESET} from './Components/Actions'
import reducer from "./Components/Reducer"
import { Provider } from "react-redux"
import { createStore } from 'redux'
import {saveState, loadState} from "./Components/localstorage"


const persistedState = loadState()


let cart = {
  count: 0,
  contents: [],
  total: 0,
}



//dispatch(addItem())

const store = createStore(reducer,persistedState)

store.subscribe(() => {
  saveState(store.getState())
})
ReactDOM.render(
    <Provider store={store}>
    <App />
    <Route exact path = "/" component ={IndexPage}/>
    <Route exact path= "/cart" component = {Cart}/>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
