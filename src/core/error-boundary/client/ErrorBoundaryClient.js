import Api from '../../util/client/Api'

export default {
	notifyErrorBoundary(errorInfo) {
		return Api.post('/error-report', errorInfo)
	},
}
