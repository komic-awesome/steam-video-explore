import { State, Effect, Actions, getState } from 'jumpstate'

const HEADER_HEIGHT = 76
const ITEM_VIDEO_HEIGHT = 281

export default State({
  initial: {
    appidShouldBePlay: undefined,
    appidsShouldBeRender: [],
  },

  viewportChanged(state, payload) {
    let { videoList } = getState()
    let scrollY = window.scrollY

    let shouldRenderIds = []
    let shouldPlayId
    let cursorY = HEADER_HEIGHT
    let viewportBottomY = scrollY + window.innerHeight

    videoList.collection.forEach((item, index) => {
      let currentItemTop = cursorY
      let shouldBeUnRendered = currentItemTop + ITEM_VIDEO_HEIGHT < scrollY
        || currentItemTop > viewportBottomY

      cursorY += ITEM_VIDEO_HEIGHT

      if (shouldBeUnRendered) { return }

      let appid = item.get('appid')
      if (!shouldPlayId && currentItemTop > scrollY) {
        shouldPlayId = appid
      }
      shouldRenderIds.push(appid)
    })

    return {
      appidShouldBePlay: shouldPlayId,
      appidsShouldBeRender: shouldRenderIds,
    }
  }
})
