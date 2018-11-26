import jwt from './jwt'
import apiService from '../src/api/apiService'
import Alert from 'react-s-alert'

const hostUrl = 'http://localhost:52996/'
let now = new Date()

/* CHECK TOKEN AT PAGE LOADING */
const onPageLoadChecks = () => {
  let token = jwt.get()
  if (token) {
    return apiService
      .getApiEndpoint('GetValidateAndRefreshToken')
      .then(response => {
        if (response.status === 200) {
          jwt.set(response.data.token)
          return true
        } else {
          jwt.remove()
          return false
        }
      })
  } else {
    return Promise.resolve(false)
  }
}

/* LOGIN */

const logIn = credentials =>
  apiService
    .getApiEndpoint('PostLogin', {
      usernameOrEmail: credentials.usernameOrEmail,
      password: credentials.password
    })
    .then(response => {
      console.log(credentials)
      console.log(response.data)
      console.log(response.status)
      console.log(now.toISOString())

      if (response.status === 200) {
        console.log('Le token est là ')
        storeToken(response.data.token, credentials.isRemembered)
        apiService
          .getApiEndpoint('GetValidateAndRefreshToken')
          .then(results => {
            console.log(results)
          })
        console.log('le token a été rafraichi !')
        onPageLoadChecks()
        document.location.reload(true)
      } else {
        alert('Wrong credentials, please sign in again')
        document.location.reload(true)
      }
      return Promise.resolve(response)
    })
    .catch(reason => {
      console.error('onRejected function called: ' + reason)
    })

/* LOG OUT */

const logout = () => {
  jwt.remove()
  onPageLoadChecks()
  document.location.reload(true)
  return Promise.resolve()
}

/* STORE TOKEN TO LOCAL OR SESSION STORAGE */

const storeToken = (token, isRemembered) => {
  if (isRemembered) {
    console.log('je stocke le token en localstorage !')
    jwt.set(token)
  } else {
    console.log('je stocke le token en sessionstorage')
    jwt.setSessionStorage(token)
  }
}

/* MANAGE USERS */

const getAccounts = () => {
  apiService
    .getApiEndpoint('GetAccounts')
    .then(users => console.log(users.data.items))
}
const editUser = prop => {
 console.log(prop)
  apiService
    .getApiEndpoint(
      'PutAccount',
      {
        userName: prop.userName,
        firstName: prop.firstName,
        lastName: prop.lastName,
        emailAddress: prop.emailAddress,
        roles: prop.roles,
        password: prop.password,
        sourceLanguages: prop.sourceLanguages,
        targetLanguages: prop.targetLanguages,
        domains: prop.domains,
        profilePictureLink: prop.profilePictureLink,
        active: prop.active
      },
      { id: 4 }
    )
    .then(res => {
      console.log(res)
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

const deleteUser = prop => {
  apiService
    .getApiEndpoint('DeleteAccount', null, { id: prop.id })
    .then(res => console.log(res))
}

const loginAsUser = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('GetAccount', null, { id: prop })
    .then(console.log(prop))
    .then(res => {
      console.log(res)
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

/*
const deleteDomain = prop =>
  apiService
    .getApiEndpoint('deleteDomain')
    .then(domains => console.log(domains.data.items)) */

const addDomain = domainName => {
  console.log(domainName)
  apiService
    .getApiEndpoint('PostDomains', { name: domainName }, null)
    .then(console.log(domainName))
    .then(res => {
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

const editDomain = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('PutDomains', { name: prop }, { id: 4 })
    .then(console.log(prop))
    .then(res => {
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}
/* MANAGE ROLES */
const editRole = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('PutRoles', { description: 'test role update' }, { id: 4 })
    .then(console.log(prop))
    .then(res => {
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

const loginAsRole = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('GetRole', null, { id: prop })
    .then(console.log(prop))
    .then(res => {
      console.log(res)
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

/* MANAGE LANGUAGES */
const editLanguage = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint(
      'PutLanguages',
      {
        name: 'French (France)',
        code: 'fr',
        isNeutral: true
      },
      { id: 1 }
    )
    .then(console.log(prop))
    .then(res => {
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

export default {
  logIn,
  logout,
  storeToken,
  onPageLoadChecks,
  getAccounts,
  editDomain,
  deleteUser,
  addDomain,
  editRole,
  editLanguage,
  loginAsRole,
  loginAsUser,
  editUser
}
