'use strict'

const requestFetch = require('./mods/requestFetch')
const saveAppDetail = require('./mods/saveAppDetail')
const saveTop100in2weeks = require('./mods/saveTop100in2weeks')
const values = require('lodash/values')
const sortBy = require('lodash/sortBy')

// See more http://stackoverflow.com/a/29396005

function promiseWhile(predicate, action, value) {
  return Promise.resolve(value).then(predicate).then(function(condition) {
    if (condition) {
      return promiseWhile(predicate, action, action())
    }
  })
}

function fetchTop100in2weeks() {
  return requestFetch(
    { url: 'http://steamspy.com/api.php?request=top100in2weeks'
    , json: true
    }
  )
}

fetchTop100in2weeks()
  .then((gameInfosObject) => {
    let infos = values(gameInfosObject)

    return sortBy(infos, function(info) {
      return -info.score_rank
    }).map((info) => { return info.appid })
  })
  .then((appids) => {
    return saveTop100in2weeks(appids).then(() => {
      let length = appids.length
      return promiseWhile(
        () => { return appids.length }
      , () => {
          let appid = appids.pop()
          return saveAppDetail(appid)
        }
      , Promise.resolve()
      )
    })
  })
  .then(() => {
    console.log('Success')
  })
  .catch((error) => {
    console.log(error)
  })
