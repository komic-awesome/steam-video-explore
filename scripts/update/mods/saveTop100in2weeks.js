const Avos = require('./Avos.js')

module.exports = function(appids) {
  return Avos.loginAvos().then(() => {
    let top100in2weeks = Avos.object('top100in2weeks')
    top100in2weeks.set('content', appids)
    return top100in2weeks.save()
  })
}
