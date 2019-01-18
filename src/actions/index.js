export const EDIT_DOMAIN = 'EDIT_DOMAIN'
export const ERROR_EDIT_DOMAIN = 'ERROR_EDIT_DOMAIN'
export const EDIT_LANGUAGE = 'EDIT_LANGUAGE'
export const ERROR_EDIT_LANGUAGE = 'ERROR_EDIT_LANGUAGE'
export function EditLanguage (language) {
  console.log('----------------')
  console.log('selected', language)
  console.log('----------------')
  return {
    type: 'EDIT_LANGUAGE',
    payload: 'REDUX'
  }
}
