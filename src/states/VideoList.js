import { State, Effect, Actions } from 'jumpstate'
import Avos from 'mods/Avos'

let AV = Avos.AV

let VideoListState = State({
  initial: { collection: [] },

  loadVideoListSuccess (state, payload) {
    return { collection: payload.filter(item => item.get('content').movies) }
  }
})

Effect('fetchVideoList', () => {

  let collection = new AV.Query('steamdbSales')
  collection.descending('createdAt')
  collection.first().then((apps) => {
    let relation = apps.relation('containedApp')
    let query = relation.query();
    query.find()
      .then(
        (result) => {
          VideoListState.loadVideoListSuccess(result)
          Actions.viewportChanged()
        },
        () => { Actions.ajaxError() }
      )
  })

})

export default VideoListState
