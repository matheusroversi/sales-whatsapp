import React, { Component } from 'react'
import device from 'device'
import { connect } from 'react-redux'
import { ErrorBoundaryActions } from '../../core'

class AppErrorBoundaryContainer extends Component {
	componentDidMount() {
		//this.props.connectWS('90')
	}

	componentDidCatch(error, info) {
		const { userAgent } = navigator
		const deviceInfo = device(userAgent)

		this.props.notifyErrorBoundary({ error, info, navigator, deviceInfo })
	}
	render() {
		if (this.props.hasError) {
			return <div>{'Aocorreu algum erro....'}</div>
		}
		return this.props.children
	}
}

const mapStateToProps = state => {
	return {
		...state.ErrorBoundaryReducer,
	}
}

export default connect(
	mapStateToProps,
	{
		...ErrorBoundaryActions,
	}
)(AppErrorBoundaryContainer)
