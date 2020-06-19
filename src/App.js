import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import AppRouter from './routes/AppRouter'
import rootReducer from './reducers'
import { routerMiddleware } from 'connected-react-router'
import AppErrorBoundaryContainer from './components/error-boundary/AppErrorBoundaryContainer'
import Error500 from './components/Error500'
import PageLayout from './components/PageLayout'
import MenuUsers from './components/MenuUsers'
import MenuCard from './components/MenuCard'
import { AppBarRouter } from './routes/AppRouter'
import Loading from './components/Loading'
import ConfirmLogoutDialog from './containers/ConfirmLogoutDialog'
import MessageDialog from './components/MessageDialog'
import Providers from './providers'

const history = createHashHistory({})
const midlewares = [thunk, routerMiddleware(history)]

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...midlewares))

const store = createStore(rootReducer(history), composedEnhancers)

class App extends Component {
	if(error) {
		return (
			<Error500
				onReload={() => {
					window.location.reload()
				}}
			/>
		)
	}



	render() {
		let isLoading = false
		return (
			<Providers store={store}>
				<AppErrorBoundaryContainer>
					<PageLayout history={history}>
						{isLoading ? <Loading /> : <AppRouter history={history} />}
					</PageLayout>
					<MessageDialog onClose={() => {}} />
					<ConfirmLogoutDialog />
				</AppErrorBoundaryContainer>
			</Providers>
		)
	}
}

export default App
