

if (!('serviceWorker' in navigator)) {
	throw 'Service workers are not supported'
}

Notification.requestPermission()

navigator.serviceWorker.register('sw.js').then(function(reg) {
	if (reg.installing) {
		console.log('Service worker installing')
	} else if (reg.waiting) {
		console.log('Service worker installed')
	} else if (reg.active) {
		console.log('Service worker active')
	}

	if (!reg.showNotification) {
		throw "Notifications aren't supported on service workers."
		return
	}

	if (Notification.permission === 'denied') {
		throw 'The user has blocked notifications.'
	}
})
