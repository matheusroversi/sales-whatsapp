import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'

const history = createBrowserHistory()
const midlewares = [thunk, routerMiddleware(history)]

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...midlewares))

export const store = createStore(
	connectRouter(history)(rootReducer),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	composedEnhancers
)
