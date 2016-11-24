const request = require('request')

function resolveResponseBody(resolve, reject) {
  const SUCCESS = 200

  return (error, response, body) => {
    if (!error && response.statusCode === SUCCESS) {
      return resolve(body)
    }

    reject(error || '网络发生了错误')
  }
}


module.exports = function(options) {
  return new Promise(function(resolve, reject) {
    request.get(options, resolveResponseBody(resolve, reject))
  })
}
