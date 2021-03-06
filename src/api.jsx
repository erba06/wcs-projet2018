import React from 'react'
import Alert from 'react-s-alert'
import createHashHistory from 'history/createBrowserHistory'
import apiService from '../src/api/apiService'
import jwt from './jwt'

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
/* WHOAMI */

const whoAmI = () => {
  apiService.getApiEndpoint('GetWhoAmI').then(authInfo => {
    console.log(authInfo.data.roles)
  })
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
        Alert('Wrong credentials, please sign in again')
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
  console.log('USERS :' + user)
  apiService
    .getApiEndpoint('PostAccounts', {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      roles: user.selectedRoles,
      password: user.password,
      sourceLanguages: user.selectedSources,
      targetLanguages: user.selectedTargets,
      domains: user.selectedDomains,
      profilePictureLink: 'https://imgur.com/.....'
    })
    .then(res => {
      if (res.status === 200 || 204) {
        Alert.success('The user has been added')
        setTimeout(() => {
          window.location.href = '/editrole/2#/manageusers'
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
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
        roles: prop.selectedRoles,
        password: prop.password,
        sourceLanguages: prop.selectedSources,
        targetLanguages: prop.selectedTargets,
        domains: prop.selectedDomains,
        profilePictureLink: prop.profilePictureLink,
        active: prop.active
      },
      { id: prop.newId2 }
    )
    .then(res => {
      if (res.status === 200 || 204) {
        Alert.success('The user has been edited')
        // setTimeout(() => {
        //   window.location.href = '/editrole/2#/manageusers'
        // }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}

const deleteUser = prop => {
  apiService
    .getApiEndpoint('DeleteAccount', null, { id: prop.id })
    .then(res => console.log(res))
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        Alert.success('The user has been deleted')
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
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
  console.log(id)
  apiService.getApiEndpoint('GetAccount', null, { id: id }).then(res => {
    if (res.status === 200) {
      console.log('succès')
      // const history = createHashHistory({
      //   hashType: 'noslash' // Omit the leading slash
      // })
      // history.push(`/edituser/${res.data.id}`)
      window.location.href = `/editrole/${res.data.id}#/edituser/${res.data
        .id}`
    } else {
      console.log(res.status)
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
      if (res.status === 200 || 204) {
        Alert.success('The domain has been added')
        setTimeout(() => {
          window.location.href = '/editrole/2#/managedomains'
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}

const deleteDomain = prop => {
  apiService.getApiEndpoint('DeleteDomain', null, { id: prop }).then(res => {
    if (res.status === 200 || res.status === 204) {
      Alert.success('The domain has been deleted')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      Alert.error('Error, try again')
    }
  })
}

const editDomain = prop => {
  apiService
    .getApiEndpoint('PutDomains', { name: prop.domains }, { id: prop.id })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        Alert.success('The domain has been edited')
        setTimeout(() => {
          window.location.href = '/editrole/2#/managedomains'
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
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
  apiService.getApiEndpoint('DeleteRole', null, { id: prop }).then(res => {
    if (res.status === 200 || res.status === 204) {
      Alert.success(`The role has been deleted`)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      Alert.error('Error, try again')
    }
  })
}

const editRole = role => {
  console.log(role)
  apiService
    .getApiEndpoint(
      'PutRoles',
      { description: role.description },
      { id: role.id }
    )
    .then(res => {
      if (res.status === 200) {
        Alert.success('The role has been edited')
        setTimeout(() => {
          window.location.href = '/editrole/23#/manageroles'
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}

const loginAsRole = prop => {
  console.log(prop)
  apiService
    .getApiEndpoint('GetRole', null, { id: prop })
    .then(console.log(prop))
    .then(res => {
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
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        console.log('succes')
        Alert.success('The role has been added')
        setTimeout(() => {
          window.location.href = '/editrole/23#/manageroles'
        }, 500)
      } else {
        Alert.error('Error, try again')
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
        Alert.success('The language has been added')
        setTimeout(() => {
          window.location.href = '/editrole/2#/managelanguages'
        }, 500)
      } else {
        Alert.error('Error, try again')
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
        Alert.success('The language has been edited')
        setTimeout(() => {
          window.location.href = '/editrole/2#/managelanguages'
        }, 500)
      } else {
        Alert.error('Error, try again')
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
    }
  })
}

const deleteLanguage = prop => {
  apiService
    .getApiEndpoint('DeleteLanguage', null, { id: prop.id })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        Alert.success('The language has been deleted')
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}

/* MONTHLY & WEEKLY PLANNING */
const displayDomains = (account, index) => {
  // console.log(account.domains.length)
  if (account.domains.length === 0) {
    return null
  } else if (account.domains.length === 1) {
    return account.domains[0].domainName
  } else {
    return account.domains
      .map(arrayOfDomains => arrayOfDomains.domainName)
      .join('/ ')
  }
}

/* SELECT TRANSLATOR MONTHLY */
const displayLanguages = account => {
  if (account.sources.length === 0) return null
  else if (account.sources.length === 1) {
    return (
      account.sources[0].languageCode + ' to ' + account.targets[0].languageCode
    )
  } else {
    return account.sources.map(arrayOfSources => (
      <li>{arrayOfSources.languageName}</li>
    ))
  }
}
const displayLanguagesInResultPanel = account => {
  if (account.sources.length === 0) return null
  else if (account.sources.length === 1 && account.targets.length === 1) {
    return (
      account.sources[0].languageCode + ' to ' + account.targets[0].languageCode
    )
  } else {
    return (
      account.sources.map(arrayOfSources => ' ' + arrayOfSources.languageCode) +
      ' to ' +
      account.targets.map(a => ' ' + a.languageCode)
    )
  }
}

const checkSourceLanguages = account => {
  if (account.sources.length === 0) {
    return null
  } else if (account.sources.length === 1) {
    return account.sources[0].languageName
  } else {
    return account.sources.map(arrayOfSources => arrayOfSources.languageName)
  }
}

const checkTargetLanguages = account => {
  if (account.targets.length === 0) {
    return null
  } else if (account.targets.length === 1) {
    return account.targets[0].languageName
  } else {
    return account.targets.map(arrayOfTargets => arrayOfTargets.languageName)
  }
}

const isTranslator = roles => roles.indexOf('Translator') > -1
const displayTranslatorOnly = roles =>
  roles.filter(role => role.indexOf('Translator') > -1)

/* TRANSLATION REQUESTS */
const addTranslationRequest = translationRequest => {
  apiService
    .getApiEndpoint('PostTranslationRequests', {
      jobType: translationRequest.requestType,
      wordCount: translationRequest.wordcount,
      wwc: translationRequest.WWC,
      deadline: translationRequest.value,
      comments: translationRequest.comments,
      projectPath: translationRequest.pathName,
      source: translationRequest.selectedSources,
      targets: translationRequest.selectedTargets,
      domain: translationRequest.selectedDomains,
      orderNumber: translationRequest.orderNumber,
      qualification: translationRequest.qualifications,
      clientName: translationRequest.clientName
    })
    .then(res => {
      if (res.status === 200) {
        Alert.success('The Translation request has been added')
        // setTimeout(() => {
        //   window.location.href = '/editrole/#/translationrequests'
        //  }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}
const addUserAvailability = userAvailability => {
  console.log(userAvailability)
  apiService
    .getApiEndpoint('PutUserAvailability', {
      unavailable: true,
      from: userAvailability.startDate,
      to: userAvailability.endDate
    })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        console.log('success')
        Alert.success('The user availability has been added')
        setTimeout(() => {
          window.location.href = '/#/myavailability'
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}
const getUserAvailability = userAvailability => {
  console.log(userAvailability)
  apiService.getApiEndpoint('GetUserAvailability').then(res => {
    if (res.status === 200 || 204) {
      console.log('success')
      console.log(userAvailability.data.items)
    } else {
      Alert.error('Error, try again')
    }
  })
}
const cancelAssignment = assignmentId => {
  console.log(assignmentId)
  apiService
    .getApiEndpoint('CancelAssignment', null, { id: assignmentId })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        console.log('success')
        console.log(res.data)
        Alert.success(`The translation request has been cancelled`)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}
const acceptAssignment = assignmentId => {
  console.log(assignmentId)
  apiService
    .getApiEndpoint(
      'AssignTranslationRequests',
      {
        message: 'An optional message to the requester',
        reviewType: 'A recommended review type.'
      },
      { id: assignmentId }
    )
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        console.log('success')
        console.log(res.data)
        Alert.success(`The translation request has been accepted`)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}
const rejectTranslationRequest = prop => {
  apiService
    .getApiEndpoint('RejectTranslationRequests', null, { id: prop })
    .then(res => {
      if (res.status === 200 || res.status === 204) {
        Alert.success(`The translation request has been deleted`)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        Alert.error('Error, try again')
      }
    })
}
const renotifyTranslationRequest = id => {
  apiService.getApiEndpoint('Renotify', null, { id: id }).then(res => {
    if (res.status === 200 || res.status === 204) {
      Alert.success(`The translation request has been renotified`)
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
    } else {
      Alert.error('Error, try again')
    }
  })
}
const deleteTranslationRequest = id => {
  apiService.getApiEndpoint('DeleteTranslationRequest', null, { id: id }).then(res => {
    if (res.status === 200 || res.status ===
      204) {
      Alert.success(`The translation request has been deleted`)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      Alert.error('Error, try again')
    }
  })
}

export default {
  whoAmI,
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
  getLanguage,
  displayDomains,
  displayLanguages,
  displayLanguagesInResultPanel,
  checkSourceLanguages,
  checkTargetLanguages,
  isTranslator,
  displayTranslatorOnly,
  addTranslationRequest,
  addUserAvailability,
  getUserAvailability,
  cancelAssignment,
  acceptAssignment,
  rejectTranslationRequest,
  renotifyTranslationRequest,
  deleteTranslationRequest
}
