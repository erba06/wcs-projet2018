import selectTranslationReducer from '../reducers/reducer_language'

export const EDIT_DOMAIN = 'EDIT_DOMAIN'
export const ERROR_EDIT_DOMAIN = 'ERROR_EDIT_DOMAIN'
export const SELECT_TRANSLATION = 'SELECT_TRANSLATION'
export const ERROR_SELECT_TRANSLATION = 'ERROR_SELECT_TRANSLATION'
// export const LOGIN_IN = 'LOG_IN'
// export const LOGIN_OUT = 'LOG_OUT'
export const SHOW_DETAILS = 'SHOW_DETAILS'
export const ERROR_SHOW_DETAILS = 'ERROR_SHOW_DETAILS'

export function selectTranslation (selectedTranslation) {
  console.log('----------------')
  console.log('selected', selectedTranslation)
  console.log('----------------')
  return {
    type: 'SELECT_TRANSLATION',
    selectTranslationReducer,
    payload: 'REDUX'
  }
}
