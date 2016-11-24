const AV = require('leancloud-storage')
const APP_ID = 'bfsMirq2pf1iRgn9fowV71Lm-gzGzoHsz'
const APP_KEY = 'GzUi0OCBQjcCn6OpTGxdVFmj'
const env = require('dotenv').config()

AV.init({ appId: APP_ID, appKey: APP_KEY })

module.exports = {
  AV: AV
, loginAvos: () => {
    return AV.User.logIn(env.AVOS_ADMIN_USER, env.AVOS_ADMIN_PASSWORD)
  }
, query: (columnName) => {
    return new AV.Query(columnName)
  }
, object: (objectName) => {
    let AvosObject = AV.Object.extend(objectName)
    let avosObject = new AvosObject()
    return avosObject
  }
}
