/* eslint-disable no-undef,no-restricted-globals */
import Pusher from 'pusher-js/dist/web/pusher'
// importScripts('pusher-js/dist/worker/pusher.worker.js')

/*Pusher.setLogger(function(log) {
	console.log(log)
})*/

var pusher = new Pusher('df3092e15104bad69ea4', {
	cluster: 'us2',
	forceTLS: true,
})

var channel = pusher.subscribe('my-channel')

channel.bind('my-event', function(data) {
	Notification.requestPermission()
		.then(res => {
			/* console.log(res)
			console.log(data)
			const notification = new Notification(data.title, {
				icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9b-edzs1U670xr2k-g3LNpy4qJrA-BmoI-n8CvnSaa5pcMJw',
				body: data.message,
			}) */
		})
		.catch(err => {})
})
