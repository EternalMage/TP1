const http = require('http')

const httpProxy = require('http-proxy')

const PORT = process.env.PORT || 8080

const addresses = [
  {
    host: 'localhost',
    port: 3000
  }
  // {
  //   host: '132.207.153.156',
  //   port: 3000
  // }
]

// Create a set of proxy servers
const proxyServers = addresses.map(function (target) {
  return new httpProxy.createProxyServer({
    target: target
  })
})

const server = http.createServer(function (req, res) {
  const proxy = proxyServers.shift()

  proxy.web(req, res)

  proxyServers.push(proxy)
})

server.listen(PORT, function () {
  console.log('Reverse proxy server started on http://localhost:' +
    PORT + '; press Ctrl-C to terminate.')
})
