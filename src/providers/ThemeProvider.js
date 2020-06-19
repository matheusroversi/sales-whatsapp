import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { connect } from 'react-redux'

import { selectTheme } from '../core/app/selectors/AppSelectors'
import Themes from '../Themes'

const ThemeProvider = ({ theme, children }) => (
	<MuiThemeProvider theme={Themes[theme]}>
		<CssBaseline />
		{children}
	</MuiThemeProvider>
)

ThemeProvider.propTypes = {
	theme: PropTypes.string,
	children: PropTypes.node.isRequired,
}

const mapStateToProps = state => ({
	theme: selectTheme(state),
})

export default connect(mapStateToProps)(ThemeProvider)
