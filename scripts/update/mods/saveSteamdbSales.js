const Avos = require('./Avos.js')

module.exports = function(appDetails) {
  return Avos.loginAvos().then(() => {
    let collection = new Avos.AV.Object('steamdbSales')
      , relation = collection.relation('containedApp')

    appDetails.forEach((detail) => {
      if (!detail) { return }
      relation.add(detail)
    })

    return collection.save()
  })
}
