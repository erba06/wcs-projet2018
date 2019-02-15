import React from 'react'
import apiService from '../../api/apiService'
import { Panel } from 'react-bootstrap'
import '../../../src/assets/css/admin.css'

class Filter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      languages: [],
      domains: [],
      selectedTargetLanguage: 'coconut',
      selectedSourceLanguage: 'cacao',
      selectedDomain: 'hamac'
    }
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleTargetChange = this.handleTargetChange.bind(this)
    this.handleDomainChange = this.handleDomainChange.bind(this)
  }

  syncDatas = () => {
    apiService.getApiEndpoint('GetDomains').then(domains => {
      this.setState({ domains: domains.data })
    })
    apiService.getApiEndpoint('GetLanguages').then(languages => {
      this.setState({ languages: languages.data })
    })
  }
  componentDidMount () {
    this.syncDatas()
  }

  handleTargetChange (event) {
    this.props.passSelectedTargetLanguage(event.target.value)
    this.setState({ selectedTargetLanguage: event.target.value })
  }

  handleSourceChange (event) {
    this.props.passSelectedSourceLanguage(event.target.value)
    this.setState({ selectedSourceLanguage: event.target.value })
  }

  handleDomainChange (event) {
    this.props.passSelectedDomain(event.target.value)
    this.setState({ selectedDomain: event.target.value })
  }

  render () {
    const domains = this.state.domains
    const languages = this.state.languages
    const selectedTargetLanguage = this.props.selectedTargetLanguage
    const selectedSourceLanguage = this.props.selectedSourceLanguage
    const selectedDomain = this.props.selectedDomain

    console.log(this.state)

    return (
      <div className='planning-filter'>
        <Panel 
        bsStyle='primary'
         >
          <Panel.Heading id="mypanel">
            <Panel.Title componentClass='h3'>
              <i className='fas fa-filter' />
              Filter
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className='panel-body-filter'>
            <div className='form-group'>
              <label htmlFor='sel1'>Select a domain:</label>
              <select
                className='form-control'
                id='sel1'
                selecteddomain={selectedDomain}
                onChange={this.handleDomainChange}
              >
                <option value='select'>select a domain</option>
                {domains.map((domain, index) => {
                  return (
                    <option key={domain.id} selecteddomain={domain.name}>
                      {domain.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='sel2'>
                Select a source language (for translator role):
              </label>
              <select
                className='form-control'
                id='sel2'
                selectedsourcelanguage={selectedSourceLanguage}
                onChange={this.handleSourceChange}
              >
                <option value='select'>select a source language</option>
                {languages.map(languages => {
                  return (
                    <option
                      key={languages.id}
                      selectedsourcelanguage={languages.name}
                    >
                      {languages.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='sel3'>
                Select a target language (for translator role):
              </label>
              <select
                className='form-control'
                id='sel3'
                selectedtargetlanguage={selectedTargetLanguage}
                onChange={this.handleTargetChange}
              >
                <option key={languages.id} value='select'>
                  select a target language
                </option>
                {languages.map(languages => {
                  return (
                    <option
                      key={languages.id}
                      selectedtargetlanguage={languages.name}
                    >
                      {languages.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default Filter
