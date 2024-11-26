const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Joined")
})

server.listen(3004);