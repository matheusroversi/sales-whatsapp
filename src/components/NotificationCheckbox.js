import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import NotificationsOff from '@material-ui/icons/NotificationsOff'
import NotificationImportant from '@material-ui/icons/NotificationImportant'
import { AppActions } from '../core'

import {
	isNotificationEnabled,
	isNotificationBlocked,
	browserHasSupport,
	requestPermissionToNotify,
} from '../notification'

const NotificationCheckbox = ({ onChange, openMessageDialog, isDisabled }) => {
	const [isAllowed, toggleAllowed] = useState(isNotificationEnabled())

	if (!browserHasSupport()) {
		return (
			<Tooltip title="This browser doesn't support notifications">
				<NotificationsOff />
			</Tooltip>
		)
	}

	if (!isAllowed) {
		return (
			<Tooltip title="Request notification permission">
				<IconButton
					aria-label="Exit room"
					aria-controls="menu-appbar"
					onClick={() => {
						if (isNotificationBlocked()) {
							openMessageDialog(
								'Notification blocked',
								"You must unlock Matrix's notification option in your browser settings."
							)
						} else {
							requestPermissionToNotify(hasPermission => {
								if (hasPermission) {
									toggleAllowed(true)
								}
							})
						}
					}}
					color="inherit"
				>
					<NotificationImportant />
				</IconButton>
			</Tooltip>
		)
	}

	return (
		<Tooltip title={`${isDisabled ? 'Enable' : 'Disable'} notification`}>
			<Checkbox
				icon={<Notifications />}
				checkedIcon={<NotificationsOff />}
				checked={isDisabled}
				onChange={onChange}
			/>
		</Tooltip>
	)
}

const mapStateToProps = state => {
	return {
		...state.AppReducer,
	}
}
export default connect(mapStateToProps, {
	...AppActions,
})(NotificationCheckbox)
