'use strict'

// TODO(yangqing):DRY

const requestFetch = require('./mods/requestFetch')
const Nightmare = require('nightmare')
const saveAppDetail = require('./mods/saveAppDetail')
const saveSteamdbSales = require('./mods/saveSteamdbSales')

function promiseWhile(predicate, action, value) {
  return Promise.resolve(value).then(predicate).then(function(condition) {
    if (condition) {
      return promiseWhile(predicate, action, action())
    }
  })
}

function fetchSteamdbSales() {
  return new Promise((resolve, reject) => {
    let nightmare = Nightmare({ show: false })

    nightmare
      .goto('https://steamdb.info/sales/')
      .evaluate(function () {
        let elements = document.querySelectorAll('[data-appid]')
          , appids = []

        for (let element of elements) {
          appids.push(element.getAttribute('data-appid'))
        }

        return appids
      })
      .end()
      .then(resolve, reject)
  })
}

fetchSteamdbSales()
  .then((appids) => {
    let appDetails = []
    let length = appids.length
    let i = 1

    return promiseWhile(
      () => { return appids.length }
    , () => {
        let appid = appids.pop()
        console.log(i)
        i++;

        return saveAppDetail(+appid).then((appDetail) => {
          appDetails.push(appDetail)
        })
      }
    , Promise.resolve()
    ).then(() => {
      return saveSteamdbSales(appDetails)
    })
  })
  .then(() => {
    console.log('Success')
  })
  .catch((error) => {
    console.log(error)
  })
