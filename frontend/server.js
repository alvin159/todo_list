const http = require('http')

const hostname = 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader("Access-Control-Allow-Origin", "*");
  
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
