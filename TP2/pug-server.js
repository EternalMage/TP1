'use strict'

const PORT = process.env.PORT || 3000

// module.exports = module.exports.default = pugServer

function pugServer(viewsPath) {
  const http = require('http')
  const path = require('path')
  const pug = require('pug')
  const fs = require('fs')
  const nodeStatic = require('node-static')
  const filePath = path.join(viewsPath || '.')
  const fileServer = new nodeStatic.Server(filePath)

  let server = http.createServer(function (req, res) {
    if (req.url.includes('?')) {
      req.url = req.url.slice(0, req.url.indexOf('?'))
    }
    // if (req.url.match(/\.(jade|pug)/) || req.url === '/') {
    if (req.url === '/' || fs.existsSync(filePath + '/views' + req.url + '.pug')) {
      const file = (req.url === '/') ? '/index' : req.url

      try {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(
          pug.renderFile(filePath + '/views' + file + '.pug', {
            pretty: true
          })
        )
      }
      catch (e) {
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end(e.toString())
      }
    }
    else if (req.url === '/api/description') {
      // res.writeHead(200, {'Content-Type': 'text/plain'})
      // res.end('Hello')
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({ 'description': 'Le <strong>laboratoire Semantic IA</strong> est un laboratoire de recherche qui lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu nunc pretium, finibus quam in, varius urna. Nunc vestibulum at nibh at egestas. Nulla interdum iaculis dui, quis varius lacus elementum id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed eu imperdiet felis. Etiam hendrerit id libero quis ultricies. Nunc molestie tellus ultrices elit molestie tincidunt. Mauris id interdum turpis. Nullam fermentum ornare arcu, id vehicula leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus aliquam dignissim volutpat. Nunc sit amet varius risus. Curabitur ex libero, rhoncus tincidunt hendrerit et, feugiat ut purus.\nNunc id sodales odio, ut pretium tortor. Sed gravida semper est et finibus. Mauris vulputate fringilla nulla et pretium. Nulla facilisi. Maecenas scelerisque convallis dui tincidunt volutpat. Curabitur vitae feugiat tortor. Duis vitae turpis consequat, lacinia nisl vitae, lobortis nisi. Mauris aliquet, felis in blandit cursus, odio arcu suscipit sem, id blandit massa eros non nunc. Fusce ac sodales tellus, vel efficitur metus.\nIn congue, justo at auctor consequat, dolor eros laoreet augue, sit amet molestie felis massa sed nunc. Curabitur at nibh et ipsum facilisis molestie. Donec dictum dapibus diam, sed fringilla tellus tincidunt ut. Nam porttitor in diam ut dapibus. Cras sit amet diam odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet eros quis sem imperdiet suscipit. Fusce luctus turpis ut metus convallis, ac ornare augue fermentum. Phasellus aliquet, elit eu tempus aliquam, odio est tristique quam, quis luctus augue lorem sit amet lorem. Quisque tellus sem, rutrum vitae hendrerit in, tempus vitae neque. Morbi blandit sagittis risus a placerat.' }))
    }
    else {
      req.addListener('end', function () { fileServer.serve(req, res) }).resume()
    }
  })

  server.listen({host: 'localhost', port: PORT}, function(err) {
    if (err) throw err
    console.log('Server started on: http://' + server.address().address + ':' + PORT)
  })

  return server
}

pugServer()
