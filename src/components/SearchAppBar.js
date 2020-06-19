import React, { useState, Component } from 'react'
import { connect } from 'react-redux'
import { AppActions } from '../core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles(theme => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	closeIcon: {
		position: 'absolute',
		zIndex: '9',
		bottom: '16px',
		right: '88px',
		color: 'gray',
	},
	search: {
		marginTop: '8px',
	},
}))

const SearchAppBar = props => {
	const [open, setOpen] = useState(false)
	const classes = useStyles()

	let { setSearchText, searchText } = props

	const handleChange = text => {
		setSearchText(text)
	}

	const handleClose = () => {
		setOpen(false)
		setSearchText('')
	}
	return (
		<>
			<IconButton
				className={clsx(classes.menuSearchButton, open && classes.hide)}
				color="inherit"
				aria-label="Menu"
				onClick={() => {
					setOpen(true)
				}}
			>
				<SearchIcon />
			</IconButton>
			<div className={clsx(classes.search, !open && classes.hide)}>
				<div onClick={handleClose} className={classes.closeIcon}>
					<CloseIcon />
				</div>
				<InputBase
					onChange={e => handleChange(e.target.value)}
					value={searchText}
					className={clsx(classes.menuButton)}
					placeholder="Procurar..."
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ 'aria-label': 'search' }}
				/>
			</div>
		</>
	)
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}

export default connect(mapStateToProps, {
	...AppActions,
})(SearchAppBar)
