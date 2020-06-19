import ACTION_TYPES from '../action-types/ErrorBoundaryActionTypes'

const initialState = {
	hasError: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_APP_ERROR_TRUE:
			const hasError = action.payload
			return {
				...state,
				hasError,
			}

		default:
			return state
	}
}
