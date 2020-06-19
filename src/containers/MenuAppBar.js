import React, { useState } from 'react'
import { connect } from 'react-redux'
/* import AppBarTitle from '../components/AppBarTitle'
import MenuRoom from '../components/MenuRoom'
import ShareModal from '../components/ShareModal' */

import { AppActions } from '../core'


const MenuAppBar = ({
	onChangeSettings,
	onChangeTheme,
	history,
	match,
	rooms,
	settings,
}) => {
	const [isShareModalOpen, setShareModalOpen] = useState(false)
	const { roomId } = match.params
	const findRoomResult = rooms.find(r => r.id === roomId)
	const currentRoomName = findRoomResult ? findRoomResult.name : ''

	return (
		<>
{/* 			<AppBarTitle>{currentRoomName}</AppBarTitle>
			<MenuRoom
				onExitRoom={() => {
					history.push('/menu')
				}}
				onShare={() => {
					setShareModalOpen(true)
				}}
				onChangeSettings={onChangeSettings}
				onChangeTheme={onChangeTheme}
				settings={settings}
			/>
			<ShareModal
				open={isShareModalOpen}
				onClose={() => {
					setShareModalOpen(false)
				}}
			/> */}
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
})(MenuAppBar)
