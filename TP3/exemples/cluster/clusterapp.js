const cluster = require('cluster')

if (cluster.isMaster) {
  // Nombre de CPUs dans la machine.
  const cpuCount = require('os').cpus().length

  // Créer un worker pour chaque CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }
} else {
  const express = require('express')

  const app = express()

  app.set('port', process.env.PORT || 3000)

  // Pile de middlewares associée à une route

  app.get('/', function (req, res, next) {
    // setTimeout(() => res.send('Bonjour!!!'), 2000)
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
  })

  app.listen(app.get('port'), function () {
    console.log('Express worker %d running!', cluster.worker.id)
    // console.log('Express started on http://localhost:' +
    //   app.get('port') + '; press Ctrl-C to terminate.')
  })
}

function isPrime (num) {
  if ([2, 3].indexOf(num) >= 0) return true
  else if ([2, 3].some(n => num % n === 0)) return false
  else {
    let i = 5; let w = 2
    while ((i * i) <= num) {
      if (num % i === 0) return false
      i += w
      w = 6 - w
    }
  }
  return true
}
