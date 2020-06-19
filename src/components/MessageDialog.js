import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

/* import { closeMessageDialog } from '../morpheus/store/actions'
import { selectMessageDialog } from '../morpheus/store/selectors' */
import { AppActions } from '../core'

const MessageDialog = ({ onClose, modalData }) => (
	<Dialog open={modalData.isOpen} onClose={onClose}>
		{modalData.title && <DialogTitle>{modalData.title}</DialogTitle>}
		<DialogContent>
			<DialogContentText>{modalData.message}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				onClick={() => {
					onClose()
				}}
				color="primary"
				autoFocus
			>
				OK
			</Button>
		</DialogActions>
	</Dialog>
)

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(MessageDialog)

MessageDialog.defaultProps = {
	modalData: { isOpen: false },
}

MessageDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	modalData: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired,
		title: PropTypes.string,
		message: PropTypes.string,
	}).isRequired,
}
