import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import '../../../src/assets/css/admin.css'
import api from '../../api'
import ResultPanel from '../../components/Planning/ResultPanel'

class SelectTranslators extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      selectedDomain: ''
    }
    console.log(this.props)
  }
  componentDidUpdate (oldProps) {
    const newProps = this.props

    if (oldProps !== newProps) {
      this.setState({ selectedDomain: newProps.selectedDomain })
    }
  }

  render () {
    const accounts = this.props.accounts
    const selectedDomain = this.props.selectedDomain
    const selectedSourceLanguage = this.props.selectedSourceLanguage
    const selectedTargetLanguage = this.props.selectedTargetLanguage

    const filteredAccounts = this.props.filteredAccounts
    console.log(this.props)
    console.log(this.state)

    return (
      <div className='select-translators'>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass='h3'>
              <i className='pe-7s-note2' /> Translators
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            {filteredAccounts === undefined ||
            selectedDomain === 'select' ||
            selectedSourceLanguage === 'select' ||
            selectedTargetLanguage === 'select'
              ? accounts.map((account, i) => {
                let isTranslators = api.isTranslator(account.roles)
                let domains = api.displayDomains(account)
                let languages = api.displayLanguages(account)
                let translators = api.displayTranslatorOnly(account.roles)

                if (isTranslators) {
                  return (
                    <ResultPanel
                      key={i}
                      id={account.id}
                      translators={translators}
                      languages={languages}
                      domains={domains}
                    />
                  )
                }
              })
              : filteredAccounts.map((account, i) => {
                let isTranslators = api.isTranslator(account.roles)
                let domains = api.displayDomains(account)
                let languages = api.displayLanguages(account)
                let translators = api.displayTranslatorOnly(account.roles)

                if (isTranslators) {
                  return (
                    <ResultPanel
                      key={i}
                      id={account.id}
                      translators={translators}
                      languages={languages}
                      domains={domains}
                    />
                  )
                }
              })}
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
export default SelectTranslators
