import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../states/index'
import { CreateJumpstateMiddleware } from 'jumpstate'

let middleware = applyMiddleware(
  CreateJumpstateMiddleware(), thunk, createLogger()
)

export default function configureStore() {
  const store = createStore(
    combineReducers(rootReducer),
    middleware
  )

  return store
}
