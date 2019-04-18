import { ERROR_SELECT_TRANSLATION, SELECT_TRANSLATION } from '../actions/index.js'

const SelectTranslationReducer = (state = [], action) => {


  switch (action.type) {
    case SELECT_TRANSLATION:
      console.log('SELECT_TRANSLATION reducer')
      console.log('action ', action)
      return { ...state, selectedTranslation: action.as }
    case ERROR_SELECT_TRANSLATION:
      return action.errors
    default:
      return state
  }
}
export default SelectTranslationReducer
