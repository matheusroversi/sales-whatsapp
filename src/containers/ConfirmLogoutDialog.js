import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ConfirmDialog from '../components/ConfirmDialog'
import { AppActions } from '../core'

/* import { closeLogoutConfirmDialog } from '../store/actions'
import { selectIsLogoutDialogOpen } from '../store/selectors' */
/* import { signOut } from "../socket";
 */

const signOut = () => {}
const ConfirmLogoutDialog = ({ onClose, isOpen }) => (
	<ConfirmDialog
		title="Logout"
		message="Do you really want to unplug from the matrix?"
		open={isOpen}
		onClose={onClose}
		onConfirm={signOut}
	/>
)

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(ConfirmLogoutDialog)
