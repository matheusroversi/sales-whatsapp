import React from 'react'
import { connect } from 'react-redux'
import { AppActions } from '../core'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MenuUsersItem from './MenuUsersItem'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import clsx from 'clsx'
import sendWhatsApp from '../core/util/client/ApiWhatsApp'

const useStyles = makeStyles(theme => ({
	root: {
		padding: '12px',
	},
	price: {
		textAlign: 'right',
	},
	item: {
		borderLeft: '4px solid #35cd96',
	},
	paper: {
		margin: '12px',
		// backgroundColor: '#dcf8c6',
		backgroundColor: 'rgb(240, 240, 240)',
	},
	barGreen: {
		backgroundColor: '#35cd96',
		width: '4px',
		heigth: 'auto',
	},
	buttonSend: {
		backgroundColor: '#35cd96',
		color: '#fff',
	},
}))

const MenuListCard = props => {
	const classes = useStyles()
	const { card } = props

	let total = 0
	card.map(item => {
		total += item.price * item.amount
	})

	const sendOrder = () => {
		let order = []
		order.push(
			`Olá, meu nome é *Matheus Roversi*, esse é meu pedido feito pelo *Quintal* \n`
		)
		order.push('-------- \n')
		card.map((product, key) => {
			order.push(
				`*${product.amount}* Und - ${product.description}: R$ ${(
					product.amount * product.price
				).toFixed(2)} \n`
			)
		})
		order.push('-------- \n')
		order.push(`O total do pedido é R$ ${total} \n`)
		order.push(`Forma de pagamento: Transferência \n`)
		order.push('-------- \n')
		order.push(`Contato: (48) 99850-8851 \n`)
		order.push(`Número do pedido: 11 \n`)

		let message = order.join('\n ')
		sendWhatsApp(message)
	}

	return (
		<div style={{ width: '300px' }}>
			<Paper className={classes.paper}>
				<Grid>
					{card.map((product, key) => (
						<>
							<Grid
								container
								key={key}
								xs={12}
								sm={6}
								md={4}
								className={clsx(classes.root, classes.item)}
							>
								<Grid item xs={8}>
									<Typography className={classes.description}>
										{`${product.amount}x ${product.description}`}
									</Typography>
								</Grid>
								<Grid xs={4} className={classes.price}>
									<Typography color="primary">
										R$ {(product.price * product.amount).toFixed(2)}
									</Typography>
								</Grid>
							</Grid>
							<Divider />
						</>
					))}
				</Grid>
				<Grid container xs={12} sm={6} md={4} className={classes.root}>
					<Grid item xs={8}>
						<Typography className={classes.description}>{`Total`}</Typography>
					</Grid>
					<Grid xs={4} className={classes.price}>
						<Typography color="primary">R$ {total.toFixed(2)}</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Grid
				className={classes.root}
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Button
					endIcon={<Icon>send</Icon>}
					icon="save"
					size="large"
					variant="contained"
					className={classes.buttonSend}
					onClick={sendOrder}
				>
					Fazer Pedido!
				</Button>
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
})(MenuListCard)
