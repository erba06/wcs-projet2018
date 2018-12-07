import React, { Component } from 'react'
import createHashHistory from 'history/createBrowserHistory'
import { Link } from 'react-router-dom'
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

const addUser = user => {
  console.log(user)
  apiService
    .getApiEndpoint('PostAccounts', {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      roles: [3, 4],
      password: user.password,
      sourceLanguages: [3, 4],
      targetLanguages: [1, 1],
      domains: [1, 4],
      profilePictureLink: 'https://imgur.com/.....'
    })
    .then(res => {
      console.log(res.message)
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
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
        emailAddress: prop.email,
        roles: prop.roles,
        password: prop.password,
        sourceLanguages: prop.sources,
        targetLanguages: prop.targets,
        domains: prop.domains,
        profilePictureLink: prop.profilePictureLink,
        active: prop.active
      },
      { id: prop.id }
    )
    .then(res => {
      console.log(res)
      Alert.success(`Succès`)
     
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

const getUser = id => {
  apiService.getApiEndpoint('GetAccount', null, { id: id }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      const history = createHashHistory({
        hashType: 'noslash' // Omit the leading slash
      })
      history.push(`/edituser/${res.data.id}`)
    }
  })
}


/* MANAGE DOMAINS */

const addDomain = domainName => {
  console.log(domainName)
  apiService
    .getApiEndpoint('PostDomains', { name: domainName })
    .then(console.log(domainName))
    .then(res => {
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}
const deleteDomain = prop => {
  apiService.getApiEndpoint('DeleteDomain', null, { id: prop }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    }
  })
}

const editDomain = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('PutDomains', { name: prop.domains }, { id: 6 })
    .then(console.log(prop))
    .then(res => {
      console.log(res)
      Alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    })
}

const getDomain = id => {
  apiService.getApiEndpoint('GetDomain', null, { id: id }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      const history = createHashHistory({
        hashType: 'noslash' // Omit the leading slash
      })
      history.push(`/editdomain/${res.data.id}`)
    }
  })
}

/* MANAGE ROLES */
const deleteRole = prop => {
  apiService.getApiEndpoint('DeleteRole', null, { id: prop })
  .then(res => {
    if (res.status === 200) {
      console.log('succès')
      alert.success(`Succès`)
      setTimeout(() => {
        window.location = window.location
      }, 500)
    }
  })
}

const editRole = role => {
  console.log(role)
  apiService
    .getApiEndpoint('PutRoles', { description: role.description }, { id: 5 })
    .then(console.log(role))
    .then(res => {
      console.log(res)
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
const addRole = role => {
  console.log(role)
  apiService
    .getApiEndpoint('PostRoles', {
      name: role.roleName,
      description: role.description
    })
    .then(console.log(role))
    .then(res => {
      if (res.status == 200) {
        Alert.success(`Succès`)
        setTimeout(() => {
          window.location = window.location
        }, 500)
      }
    })
}

const getRole = id => {
  apiService.getApiEndpoint('GetRole', null, { id: id }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      const history = createHashHistory({
        hashType: 'noslash' // Omit the leading slash
      })
      history.push(`/editrole/${res.data.id}`)
    }
  })
}


/* MANAGE LANGUAGES */

const addLanguage = language => {
  console.log(language)
  apiService
    .getApiEndpoint('PostLanguages', {
      name: language.languageName,
      code: language.languageCode,
      isNeutral: language.isNeutralLanguage
    })
    .then(res => {
      if (res.status === 200) {
        Alert.success(`Succès`)
        setTimeout(() => {
          window.location = window.location
        }, 500)
      }
    })
}

const editLanguage = language => {
  console.log(language)
  apiService
    .getApiEndpoint(
      'PutLanguages',
      {
        name: language.languageName,
        code: language.languageCode,
        isNeutral: language.isNeutralLanguage
      },
      { id: language.id }
    )
    .then(console.log(language))
    .then(res => {
      if (res.status === 200) {
        console.log('succès')
        Alert.success(`Succès`)
        setTimeout(() => {
          window.location = window.location
        }, 500)
      }
    })
}

const getLanguage = id => {
  apiService.getApiEndpoint('GetLanguage', null, { id: id }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      const history = createHashHistory({
        hashType: 'noslash' // Omit the leading slash
      })
      let url = `/editlanguage/${res.data.id}`
      history.push(`/editlanguage/${res.data.id}`)

      //  console.log(url.split('#')[0])
    }
    // let url = (`/editlanguage/${res.data.id}`)
    // console.log(url)
    // window.location.href = url.split("#")[0];
  })
}

const deleteLanguage = prop => {
  apiService
    .getApiEndpoint('DeleteLanguage', null, { id: prop.id })
    .then(res => {
      if (res.status === 200) {
        console.log('succès')
        Alert.success(`Succès`)
        setTimeout(() => {
          window.location = window.location
        }, 500)
      }
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
  getUser,
  addDomain,
  deleteDomain,
  getDomain,
  addRole,
  editRole,
  deleteRole,
  getRole,
  editLanguage,
  addUser,
  loginAsRole,
  loginAsUser,
  editUser,
  addLanguage,
  deleteLanguage,
  getLanguage
}
