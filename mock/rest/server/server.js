const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../db/db.json'))

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3080, () => {
	console.log('Rostering Mock Server is running')
})
