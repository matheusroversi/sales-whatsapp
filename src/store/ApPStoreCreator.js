import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import AppReducerCreator from '../reducers/AppReducerCreator'

export class StoreCreator {
	/**
	 *
	 * @param { ReducersMapObject } reducers
	 * @param { Middleware[]} middleware
	 */
	constructor(reducers, ...middleware) {
		this.reducers = reducers
		this.middlewares = [...middleware]
	}

	/**
	 *
	 * @returns {Object} ReduxStore
	 */
	buildAppStore() {
		const initialState = {}
		const enhancers = []
		const rootReducer = new AppReducerCreator(this.reducers).buildAppReducer()
		const middleware = [thunk, ...this.middlewares]

		const composedEnhancers = compose(
			applyMiddleware(...middleware),
			...enhancers
		)

		return createStore(rootReducer, initialState, composedEnhancers)
	}
}
