const Avos = require('./Avos.js')
const requestFetch = require('./requestFetch')

function fetchAppDetailFromSteam(appid) {

  return requestFetch(
    { url: `http://store.steampowered.com/api/appdetails/?appids=${appid}&cc=CN`
    , json: true
    }
  )
}

function saveAppDetailToAvos(appid, appdetailResult) {
  let result = appdetailResult

  return Avos.loginAvos()
    .then(() => {
      let query = Avos.query('appdetails')
      query.equalTo('appid', appid)
      return query.first()
    })
    .then((results) => {
      if (results
        || !result[appid].success // http://store.steampowered.com/api/appdetails/?appids=292730&&cc=CN
      ) { return Promise.resolve(results) }

      let appDetails = Avos.object('appdetails')
      appDetails.set('appid', appid)
      appDetails.set('content', result[appid].data)

      return appDetails.save().then(() => {
        return appDetails
      })
    })
}


module.exports = function(appid) {
  return new Promise((resolve, reject) => {
    fetchAppDetailFromSteam(appid)
      .then((result) => {
        return saveAppDetailToAvos(appid, result)
      })
      .then(resolve)
      .catch(reject)
  })
}
