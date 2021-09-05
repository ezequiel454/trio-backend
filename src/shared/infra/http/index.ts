import server from './server'
const PORT = process.env.PORT || 3001

server.listen(PORT, (err) => {
	if (err) {
		console.error(`Error starting server: ${err}`)
		process.abort()
	}
	console.log(`Server is running! on port ${PORT}`)
	return
})
