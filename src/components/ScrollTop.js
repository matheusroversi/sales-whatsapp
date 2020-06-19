import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from './AppBar'
import Drawer, { drawerWidth, drawerHeader } from './Drawer'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const useStyles = makeStyles(theme => ({
	scrolltop: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
}))

const ButtonScrollTop = props => {
	const classes = useStyles()

	return (
		<ScrollTop {...props}>
			<Fab color="secondary" size="small" aria-label="scroll back to top">
				<KeyboardArrowUpIcon />
			</Fab>
		</ScrollTop>
	)
}

function ScrollTop(props) {
	const { children, window } = props
	const classes = useStyles()
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	})

	const handleClick = event => {
		const anchor = document.querySelector('#back-to-top-anchor')

		console.log('click', anchor)
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.scrolltop}
			>
				{children}
			</div>
		</Zoom>
	)
}

export default ButtonScrollTop
