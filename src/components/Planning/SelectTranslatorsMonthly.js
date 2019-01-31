import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import '../../../src/assets/css/admin.css'
import SelectButton from '../Buttons/SelectButton'
import DeselectButton from '../../components/Buttons/DeselectButton'
import api from '../../api'
import ResultPanel from '../../components/Planning/ResultPanel'
import ResultPanelGreyed from '../../components/Planning/ResultPanelGreyed'

class SelectTranslatorsMonthly extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      selectedDomain: ''
    }
    console.log(this.props)
    this.greyOut = this.greyOut.bind(this)
  }

  updateIsSelected = props => {
    this.setState({ isSelected: props })
    console.log(props)
  }

  greyOut (accountId) {
    let div = document.getElementById(accountId)
    var c = window.getComputedStyle(div).backgroundColor
    if (c === 'rgb(251, 249, 252)') {
      document.getElementById(accountId).style.background = 'blue'
    } else {
      document.getElementById(accountId).style.background = 'rgb(251, 249, 252)'
    }
  }

  componentDidUpdate (oldProps) {
    const newProps = this.props

    if (oldProps !== newProps) {
      this.setState({ selectedDomain: newProps.selectedDomain })
    }
    console.log(newProps)
    console.log(oldProps)
    console.log(this.state)
  }

  render () {
    const accounts = this.props.accounts
    const isSelected = this.state.isSelected
    const isGreyed = this.state.isGreyed
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
              <SelectButton passPropsIsSelected={this.updateIsSelected} />
              <DeselectButton passPropsIsSelected={this.updateIsSelected} />
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body className='translators'>
            {filteredAccounts == undefined ||
            selectedDomain == 'select' ||
            selectedSourceLanguage == 'select' ||
            selectedTargetLanguage == 'select'
              ? accounts.map((account, i) => {
                let isTranslators = api.isTranslator(account.roles)
                let domains = api.displayDomains(account)
                let languages = api.displayLanguagesInResultPanel(account)
                let translators = api.displayTranslatorOnly(account.roles)

                if (isTranslators && !isSelected) {
                  return (
                    <div
                      className='list-translators'
                      key={i}
                      style={{ backgroundColor: 'rgb(251, 249, 252)' }}
                      id={account.id}
                      onClick={e => this.greyOut(account.id, e)}
                    >
                      <i className='fas fa-2x fa-user' />
                      <div className='list-translator-text'>
                        <div className='translator-info'>
                          <span className='label label-success label-as-badge'>
                              Junior
                          </span>
                          <div className='translator-name'>{translators}</div>
                          <div className='lg-target-source'>{languages}</div>
                          <div className='domain'>{domains}</div>
                        </div>
                      </div>
                    </div>
                  )
                } else if (isTranslators && isSelected) {
                  return (
                    <ResultPanelGreyed
                      key={i}
                      id={account.id}
                      translators={translators}
                      languages={languages}
                      domains={domains}
                      style={{ backgroundColor: 'rgb(251, 249, 252)' }}
                    />
                  )
                }
              })
              : filteredAccounts.map((account, i) => {
                let isTranslators = api.isTranslator(account.roles)
                let domains = api.displayDomains(account)
                let languages = api.displayLanguages(account)
                let translators = api.displayTranslatorOnly(account.roles)

                if (isTranslators && !isSelected) {
                  return (
                    <ResultPanel
                      key={i}
                      id={account.id}
                      translators={translators}
                      languages={languages}
                      domains={domains}
                      style={{ backgroundColor: 'rgb(251, 249, 252)' }}
                    />
                  )
                } else if (isTranslators && isSelected) {
                  return (
                    <ResultPanel
                      key={i}
                      id={account.id}
                      translators={translators}
                      languages={languages}
                      domains={domains}
                      style={{ backgroundColor: 'rgb(251, 249, 252)' }}
                    />
                  )
                }
              })}

            <span
              className='get-month-info-button'
              onClick={() => console.log('Get month info')}
            >
              <i className='fas fa-calendar-alt' />
              Get month info
            </span>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default SelectTranslatorsMonthly
