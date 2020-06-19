import React, { useState, useEffect, Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import PropTypes from 'prop-types'
import { AppActions } from '../core'
import { connect } from 'react-redux'

class ButtonBuy extends Component {
	constructor(props) {
		super(props)
	}

	componentDidUpdate = () => {}

	addCard = async (product, amount) => {
		await this.props.addCard(product, amount)
		this.forceUpdate()
	}

	subCard = async (product, amount) => {
		await this.props.addCard(product, amount)
		this.forceUpdate()
	}

	render() {
		const { addCard, product, card } = this.props
		const classes = {
			buttonBuy: {
				float: 'right',
				marginTop: '8px',
			},
		}

		let item = this.props.card.find(item => item.id === product.id)
		let amount = !!item ? item.amount : 0

		return (
			<ButtonGroup
				key={`button-buy-${product.id}`}
				size="small"
				style={classes.buttonBuy}
				variant="contained"
				color="primary"
				aria-label="outlined primary button group"
			>
				{amount > 0 && (
					<Button onClick={() => this.subCard(product, -1)}>-</Button>
				)}
				{amount === 0 && (
					<Button onClick={() => this.addCard(product, 1)}>Comprar</Button>
				)}
				{amount > 0 && <Button>{amount}</Button>}
				{amount > 0 && (
					<Button onClick={() => this.addCard(product, 1)}>+</Button>
				)}
			</ButtonGroup>
		)
	}

	findAmount = product => {
		let item = this.props.card.find(item => item.id === product.id)
		return !!item ? item.amount : 0
	}
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(ButtonBuy)
