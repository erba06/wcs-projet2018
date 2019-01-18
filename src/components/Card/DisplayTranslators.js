import React from 'react'
import api from '../../api'

const DisplayTranslators = ({ accounts, roles }) => {
  roles.filter(role => role.indexOf('Translator') > -1)

  accounts.map(account => {
    let isTranslators = api.isTranslator(account.roles)
    if (isTranslators) {
      return (
        <div className='list-translators' key={account.id}>
          <i className='fas fa-2x fa-user' />
          <div className='list-translator-text'>
            <div className='translator-info'>
              <span className='label label-success label-as-badge'>Junior</span>
              <div className='translator-name'>
                {api.displayTranslatorOnly(account.roles)}
              </div>
              <div className='lg-target-source'>
                {api.displayLanguages(account)}
              </div>
              <div className='domain'>{api.displayDomains(account)}</div>
            </div>
          </div>
        </div>
      )
    }
  })
}

export default DisplayTranslators
