import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { AppActions } from '../core'
import { connect } from 'react-redux'
import { MenuPage, CardPage } from '../pages'
import { ConnectedRouter } from 'connected-react-router'
import MenuAppBar from '../containers/MenuAppBar'

const routesEntity = [
	{
		path: '/menu',
		page: MenuPage,
		appBar: MenuAppBar,
	},
]

class AppRouter extends Component {
	render() {
		const {
			props: { history },
		} = this
		return (
			<Fragment>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/card" component={CardPage} />
						<Route exact path="/menu" component={MenuPage} />
						<Redirect to={'/menu'} />
					</Switch>
				</ConnectedRouter>
			</Fragment>
		)
	}
}

class AppBar extends Component {
	render() {
		const {
			props: { history },
		} = this
		return (
			<Fragment>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/menu" component={MenuAppBar} />
						<Redirect to={'/menu'} />
					</Switch>
				</ConnectedRouter>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}

export const AppBarRouter = connect(mapStateToProps, AppActions)(AppBar)
export default connect(mapStateToProps, AppActions)(AppRouter)
