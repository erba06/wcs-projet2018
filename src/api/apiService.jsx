import jwt from '../jwt'

const fetch = window.fetch.bind(window)
const hostUrl = 'http://localhost:51177/api'

const endpoints = {
  GetAccounts: {
    url: `${hostUrl}/Accounts`,
    method: 'GET'
  },
  PostAccounts: {
    url: `${hostUrl}/Accounts`,
    method: 'POST'
  },
  AddUsersToRoles: {
    url: `${hostUrl}/Accounts/AddUsersToRoles`,
    method: 'POST'
  },
  RemoveUsersFromRoles: {
    url: `${hostUrl}/Accounts/RemoveUsersFromRoles`,
    method: 'DELETE'
  },
  GetAccount: {
    url: `${hostUrl}/Accounts/{id}`,
    method: 'GET'
  },
  PutAccount: {
    url: `${hostUrl}/Accounts/{id}`,
    method: 'PUT'
  },
  DeleteAccount: {
    url: `${hostUrl}/Accounts/{id}`,
    method: 'DELETE'
  },
  PostLogin: {
    url: `${hostUrl}/Auth/Login`,
    method: 'POST',
    requiresAuth: false
  },
  GetWhoAmI: {
    url: `${hostUrl}/Auth/WhoAmI`,
    method: 'GET'
  },
  GetValidateAndRefreshToken: {
    url: `${hostUrl}/Auth/ValidateAndRefreshToken`,
    method: 'GET'
  },
  GetDomain: {
    url: `${hostUrl}/Domains/{id}`,
    method: 'GET'
  },
  GetDomains: {
    url: `${hostUrl}/Domains`,
    method: 'GET'
  },
  PutDomains: {
    url: `${hostUrl}/Domains`,
    method: 'PUT'
  },
  PostDomains: {
    url: `${hostUrl}/Domains/{id}`,
    method: 'POST'
  },
  DeleteDomain: {
    url: `${hostUrl}/Domains/{id}`,
    method: 'DELETE'
  },
  GetLanguages: {
    url: `${hostUrl}/Languages`,
    method: 'GET'
  },
  PutLanguages: {
    url: `${hostUrl}/Languages`,
    method: 'PUT'
  },
  PostLanguages: {
    url: `${hostUrl}/Languages`,
    method: 'POST'
  },
  GetLanguage: {
    url: `${hostUrl}/Languages/{id}`,
    method: 'GET'
  },
  DeleteLanguage: {
    url: `${hostUrl}/Languages/{id}`,
    method: 'GET'
  },
  GetRoles: {
    url: `${hostUrl}/Roles`,
    method: 'GET'
  },
  PutRoles: {
    url: `${hostUrl}/Roles`,
    method: 'PUT'
  },
  PostRoles: {
    url: `${hostUrl}/Roles`,
    method: 'POST'
  },
  GetRole: {
    url: `${hostUrl}/Roles/{id}`,
    method: 'GET'
  },
  DeleteRole: {
    url: `${hostUrl}/Roles/{id}`,
    method: 'DELETE'
  },
  GetTranslationRequests: {
    url: `${hostUrl}/TranslationRequests`,
    method: 'GET'
  },
  PostTranslationRequests: {
    url: `${hostUrl}/TranslationRequests`,
    method: 'POST'
  },
  GetTranslationRequest: {
    url: `${hostUrl}/TranslationRequests/{id}`,
    method: 'GET'
  },
  PutTranslationRequest: {
    url: `${hostUrl}/TranslationRequests/{id}`,
    method: 'GET'
  },
  DeleteTranslationRequest: {
    url: `${hostUrl}/TranslationRequests/{id}`,
    method: 'DELETE'
  },
  CancelAssignment: {
    url: `${hostUrl}/TranslationRequests/{id}/cancelAssignment`,
    method: 'PUT'
  },
  RejectTranslationRequests: {
    url: `${hostUrl}/TranslationRequests/{id}/reject`,
    method: 'PUT'
  },
  PostRenotify: {
    url: `${hostUrl}/TranslationRequests/{id}/renotify`,
    method: 'POST'
  },
  GetConstants: {
    url: `${hostUrl}/TranslationRequests/constant`,
    method: 'GET'
  },
  GetUserAvailability: {
    url: `${hostUrl}/TranslationRequests/userAvailability`,
    method: 'GET'
  },
  PutUserAvailability: {
    url: `${hostUrl}/TranslationRequests/userAvailability`,
    method: 'PUT'
  }
}

const getApiEndpoint = (endPointName, body, params, query) => {
  let ep = endpoints[endPointName]

  let init = {
    method: ep.method,
    headers: new Headers({
      'content-type': ep.contentType || 'application/json'
    })
  }

  if (ep.requiresAuth !== false) {
    init.headers.append('authorization', 'Bearer' + ' ' + jwt.get())
  }

  if (body) {
    init.body = JSON.stringify(body)
  }

  // Insérer les ID dans l'url
  let url = ep.url

  if (params) {
    for (let param in params) {
      url = url.replace('{' + param + '}', params[param])
    }
  }

  // Construire une query string
  let queries = []

  if (query) {
    for (let queryFragment in query) {
      queries.push(`${queryFragment}=${query[queryFragment]}`)
    }

    url += '?' + queries.join('&')
  }

  console.log('Calling api endpoint: ', url)

  let responsePromise = fetch(url, init)
  let jsonPromise = responsePromise
    .then(response => response.json())
    .catch(response => null)

  return Promise.all([responsePromise, jsonPromise]).then(function (
    [responseResult, jsonResult]
  ) {
    let apiResult = {
      status: responseResult.status,
      data: jsonResult,
      error: !(responseResult.status < 300)
    }

    console.log('API result:', apiResult)

    return apiResult
  })
}

export default { getApiEndpoint }
