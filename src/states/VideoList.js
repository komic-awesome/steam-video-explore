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

  var detailsQuery = new AV.Query('appdetails')

  detailsQuery.descending('createdAt')
  detailsQuery.find()
    .then(
      (result) => {
        VideoListState.loadVideoListSuccess(result)
        Actions.viewportChanged()
      },
      () => { Actions.ajaxError() }
    )

})

export default VideoListState
