const initialState = {
  loggedAs: undefined
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedAs: action.as }

    case 'LOG_OUT':
      return { ...state, loggedAs: undefined }

    default:
      return state
  }
}

export default AuthReducer
