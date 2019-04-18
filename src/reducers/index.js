import { combineReducers } from 'redux'
import DomainReducer from './reducer_domain'
import SelectTranslationReducer from './reducer_language'
import AuthReducer from './reducer_auth'

const rootReducer = combineReducers({
  domain: DomainReducer,
  selectedTranslation: SelectTranslationReducer,
  loggedAs: AuthReducer
})

export default rootReducer
