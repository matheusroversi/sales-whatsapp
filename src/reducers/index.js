import { combineReducers } from 'redux'

import { AppReducer, ErrorBoundaryReducer } from '../core'
import { connectRouter } from 'connected-react-router'
const rootReducer = history =>
	combineReducers({
		ErrorBoundaryReducer,
		AppReducer,

		router: connectRouter(history),
	})

export default rootReducer
