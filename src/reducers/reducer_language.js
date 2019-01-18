import { EDIT_LANGUAGE, ERROR_EDIT_LANGUAGE } from '../actions/index.js'

const LanguageReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_LANGUAGE':
      console.log('EDIT_LANGUAGE reducer')
      console.log('action ', action)
      action.payload = Date.now()
      const newState = [...state, action.payload]
      return newState
    case ERROR_EDIT_LANGUAGE:
      return action.errors
    default:
      return state
  }
}
export default LanguageReducer
