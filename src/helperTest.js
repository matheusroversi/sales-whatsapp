import React from 'react'

import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'

export const mountWithProvider = children => (store = {}) => {
	const mockedStore = configureMockStore()(store)
	return mount(<Provider store={mockedStore}>{children}</Provider>)
}
