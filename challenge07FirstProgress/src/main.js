const app = require('./server.js')

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening in the port ${server.address().port}`)
})
server.on('error', error => console.log(`Server error ${error}`))