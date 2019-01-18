import { EDIT_DOMAIN, ERROR_EDIT_DOMAIN } from '../actions/index.js'


export default function (state = [], action) {
  switch (action.type) {
    case EDIT_DOMAIN:
      return action.payload
    case ERROR_EDIT_DOMAIN:
      return action.errors
  }
  return state
}
