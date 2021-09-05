import server from './server'
const API_PORT = process.env.API_PORT || 3001

server.listen(API_PORT, (err) => {
	if (err) {
		console.error(`Error starting server: ${err}`)
		process.abort()
	}
	console.log(`Server is running! on port ${API_PORT}`)
	return
})
