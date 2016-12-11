const Avos = require('./Avos.js')

module.exports = function(appDetails) {
  return Avos.loginAvos().then(() => {
    let top100in2weeks = new Avos.AV.Object('top100in2weeks')
      , relation = top100in2weeks.relation('containedApp')

    appDetails.forEach((detail) => {
      if (!detail) { return }
      relation.add(detail)
    })

    return top100in2weeks.save()
  })
}
