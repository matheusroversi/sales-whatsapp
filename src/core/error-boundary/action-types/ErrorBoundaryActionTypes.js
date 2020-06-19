const namespace = 'error-boundary'

const REQUEST_NOTIFY_ERROR = `${namespace}/request_notify_error_boundary`
const REQUEST_NOTIFY_ERROR_SUCCESS = `${namespace}/request_notify_error_boundary_success`
const REQUEST_NOTIFY_ERROR_ERROR = `${namespace}/request_notify_error_boundary_error`

const SET_APP_ERROR_TRUE = `${namespace}/set_app_error_true`

export default {
	REQUEST_NOTIFY_ERROR,
	REQUEST_NOTIFY_ERROR_SUCCESS,
	REQUEST_NOTIFY_ERROR_ERROR,
	SET_APP_ERROR_TRUE,
}
