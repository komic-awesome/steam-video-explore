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

  let top100in2weeks = new AV.Query('top100in2weeks')
  top100in2weeks.first().then((apps) => {
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
