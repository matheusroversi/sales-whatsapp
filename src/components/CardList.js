import React, { Component, Fragment, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import { AppActions } from '../core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import MenuCard from './MenuCard'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useEventCallback } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(0),
	},
}))

const CardList = props => {
	const [value, setValue] = useState(0)
	const classes = useStyles()
	const { card } = props


	return (
		<div className={classes.root}>
			<Grid container spacing={0}>
				{card.map((product, key) => (
					<Grid key={key} item xs={12} sm={6} md={4}>
						<Paper className={classes.paper}>
							<Grid container spacing={1}>
								{/* Imagem */}
								<Grid item xs={4}>
									<div
										className={classes.img}
										style={{
											backgroundImage: `url("${product.images[0].link}")`,
											backgroundSize: 'cover',
										}}
									></div>
								</Grid>

								<Grid item xs={8} container spacing={0}>
									<Grid item xs={12} container spacing={0}>
										<Grid item xs={8} spacing={0}>
											<Typography className={classes.description}>
												{product.description}
											</Typography>
											<Typography
												className={classes.code}
												color="textSecondary"
											>
												ID: {product.codigo}
											</Typography>
										</Grid>
										<Grid
											xs={4}
											item
											container
											spacing={0}
											className={classes.price}
										>
											<Typography color="primary">
												R$ {product.price.toFixed(2)}
											</Typography>
										</Grid>
									</Grid>

									<Grid item xs={12}></Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(CardList)
