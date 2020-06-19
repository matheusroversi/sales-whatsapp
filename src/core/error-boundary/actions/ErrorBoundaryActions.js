import ErrorBoundaryClient from '../client/ErrorBoundaryClient'
import ACTION_TYPES from '../action-types/ErrorBoundaryActionTypes'

const {
	REQUEST_NOTIFY_ERROR_SUCCESS,
	REQUEST_NOTIFY_ERROR_ERROR,
	SET_APP_ERROR_TRUE,
} = ACTION_TYPES

// noinspection JSAnnotator
export default {
	notifyErrorBoundary(errorInfo) {
		return async dispatch => {
			try {
				let { data } = await ErrorBoundaryClient.notifyErrorBoundary(errorInfo)

				dispatch([
					{
						type: SET_APP_ERROR_TRUE,
						payload: { hasError: true },
					},
					{
						type: REQUEST_NOTIFY_ERROR_SUCCESS,
						payload: { analyticsList: data },
					},
				])
			} catch (error) {
				console.log('error')
				console.log(error)
				dispatch({
					type: REQUEST_NOTIFY_ERROR_ERROR,
					payload: error,
				})
			}
		}
	},
}
