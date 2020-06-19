import React, { useState, Fragment } from 'react'
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
import ScrollTop from './ScrollTop'
import Grid from '@material-ui/core/Grid'


const SideBar = props => {
	const { toggleDrawer, renderSideBarLeft, state } = props

	return (
		<Fragment>
			{['left', 'right'].map(anchor => (
				<div key={anchor}>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={() => toggleDrawer(anchor, false)}
						onOpen={() => toggleDrawer(anchor, true)}
					>
						{MenuUsers}
					</SwipeableDrawer>
				</div>
			))}
		</Fragment>
	)
}

export default SideBar
