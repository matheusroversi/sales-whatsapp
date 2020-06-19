import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { AppActions } from '../../core'
import CardList from '../../components/CardList'

class CardPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount = async () => {
		await this.props.requestCategories()
		await this.props.requestProducts()
	}

	render() {
		return (
			<Fragment>
				<CardList />
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(CardPage)
