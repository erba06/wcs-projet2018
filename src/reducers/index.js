import { combineReducers } from 'redux'
import DomainReducer from './reducer_domain'
import LanguageReducer from './reducer_language'

const rootReducer = combineReducers({
  domain: DomainReducer,
  language: LanguageReducer
})

export default rootReducer
