import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import { AppActions } from '../core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import UIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import InputBase from '@material-ui/core/InputBase'
import { drawerWidth } from './Drawer'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Badge from '@material-ui/core/Badge'

class IconMenuCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { toggleDrawer, card } = this.props

		let amount = 0
		card.map(item => {
			amount += item.amount
			return item
		})
		return (
			<IconButton
				color="inherit"
				aria-label="Menu"
				onClick={() => {
					toggleDrawer('right', true)
				}}
			>
				<Badge badgeContent={amount} color="secondary">
					<ShoppingBasket />
				</Badge>
			</IconButton>
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
})(IconMenuCard)
