import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar
} from 'react-bootstrap'

import Alert from 'react-s-alert'

import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'
import DatePicker from 'components/DateTimePicker/DateTimePicker.jsx'

// mandatory
import 'react-s-alert/dist/s-alert-default.css'

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

import api from '../../api'
import apiService from '../../api/apiService'

class TranslationRequestsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestType: '',
      languages: [],
      domains: [],
      constants: [],
      selectedSources: '',
      selectedTargets: '',
      selectedDomains: [],
      selectedDate: '',
      clientName: '',
      orderNumber: '',
      pathName: '',
      comments: ''
    }
  }

  updateRequestTypeField (event) {
    const requestType = event.target.value
    this.setState({ requestType }) //  autre methode this.setState({ requestType: event.target.value})
  }

  updateDeadlineField (event) {
    const selectedDate = event.target.value
    this.setState({ selectedDate: this.props.selectedDate })
    console.log(event.target.value)
  }

  updateClientNameField (event) {
    const clientName = event.target.value
    this.setState({ clientName })
    console.log(clientName)
  }

  updateSourceField (event) {
    let opts = []

    let opt

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i]

      if (opt.selected) {
        opts.push(parseInt(opt.value))
      }
    }
    console.log('opts: ', opts)
    this.setState({ selectedSources: parseInt(opts) })
  }

  updateTargetField (event) {
    let opts = []

    let opt

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i]

      if (opt.selected) {
        opts.push(parseInt(opt.value))
      }
    }
    console.log('opts: ', opts)
    this.setState({ selectedTargets: opts })
  }
  updateDomainsField (event) {
    let opts = []

    let opt

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i]

      if (opt.selected) {
        opts.push(parseInt(opt.value))
      }
    }
    console.log('opts: ', opts)
    this.setState({ selectedDomains: parseInt(opts) })
  }

  updateQualificationField (event) {
    const qualifications = event.target.value
    this.setState({ qualifications })
  }

  updateOrderNumberField (event) {
    const orderNumber = event.target.value
    this.setState({ orderNumber })
    console.log(orderNumber)
  }

  updateProjectPathField (event) {
    const pathName = event.target.value
    this.setState({ pathName })
    console.log(pathName)
  }
  updateCommentsField (event) {
    const comments = event.target.value
    this.setState({ comments })
  }

  updateWordcountField (event) {
    const wordcount = event.target.value
    this.setState({ wordcount })
  }
  updateWWCField (event) {
    const wwc = event.target.value
    this.setState({ wwc })
  }

  handleSubmit = e => {
    e.preventDefault()
    const translationRequest = this.state.translationRequest
  }

  handleGenie (event) {
    event.preventDefault()
    Alert.success('Translation request has been submitted!', {
      position: 'bottom-right',
      effect: 'genie'
    })
  }

  getValidationState () {
    const sourceLanguage = this.state.sourceLanguage
    console.log(this.state.sourceLanguage)
    const targetLanguage = this.state.targetLanguage
    console.log(this.state.targetLanguage)
    if (sourceLanguage === targetLanguage && sourceLanguage !== 'select') {
      return 'error'
    } else if (
      sourceLanguage === targetLanguage &&
      sourceLanguage === 'select'
    ) {
      return null
    } else if (
      sourceLanguage === targetLanguage &&
      (sourceLanguage === 'select' || targetLanguage === 'select')
    ) {
      return null
    } else if (
      sourceLanguage !== targetLanguage &&
      (sourceLanguage !== 'select' && targetLanguage !== 'select')
    ) {
      return 'success'
    } else if (sourceLanguage === 'select' || targetLanguage === 'select') {
      return null
    } else if (
      sourceLanguage !== targetLanguage &&
      (sourceLanguage === 'select' || targetLanguage === 'select')
    ) {
      return 'success'
    }
    return null
  }
  getInitialState = () => {
    var value = new Date().toISOString()
    return {
      value: value
    }
  }
  handleChange = (value, formattedValue) => {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    })
  }

  syncDatas = () => {
    apiService.getApiEndpoint('GetDomains').then(domains => {
      this.setState({ domains: domains.data })
    })
    apiService.getApiEndpoint('GetRoles').then(roles => {
      this.setState({ roles: roles.data })
    })
    apiService.getApiEndpoint('GetAccounts').then(accounts => {
      this.setState({ accounts: accounts.data.items })
    })
    apiService.getApiEndpoint('GetLanguages').then(languages => {
      this.setState({ languages: languages.data })
    })
    apiService.getApiEndpoint('GetConstants').then(constants => {
      this.setState({ constants: constants.data })
    })
  }
  componentDidUpdate = () => {
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById('example-datepicker')
    console.log(hiddenInputElement.value) // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  }

  componentDidMount () {
    this.syncDatas()
  }

  render () {
    const languages = this.state.languages
    const domains = this.state.domains
    const constants = this.state.constants
    console.log(constants)
    console.log(languages)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <h1>{JSON.stringify(this.state)}</h1>

              <Card
                title='Add a request'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={4}>
                        <FormGroup
                          required
                          name='requestType'
                          controlId='formControlsSelect'
                        >
                          <ControlLabel>Request type*</ControlLabel>
                          <FormControl
                            onChange={this.updateRequestTypeField.bind(this)}
                            componentClass='select'
                            placeholder='select'
                          >
                            <option value='select'>Request type</option>
                            {this.state.constants.jobTypes &&
                              this.state.constants.jobTypes.map(jobtypes => {
                                return (
                                  <option value={jobtypes.jobTypeId}>
                                    {jobtypes.jobTypeName}
                                  </option>
                                )
                              })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>Client deadline*</ControlLabel>
                          <DatePicker
                            id='example-datepicker'
                            name='deadline'
                            value={this.state.value}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup controlId='formControlsTextarea'>
                          <ControlLabel>Client Name*</ControlLabel>
                          <FormControl
                            required
                            onChange={this.updateClientNameField.bind(this)}
                            name='clientName'
                            bsClass='form-control'
                            ncols={['col-md-4']}
                            placeholder='Enter the Client name'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>Domain*</ControlLabel>
                          <FormControl
                            name='domain'
                            onChange={this.updateDomainsField.bind(this)}
                            componentClass='select'
                            placeholder='select'
                          >
                            <option value='select'>Select a domain</option>
                            {domains.map(domain => {
                              return (
                                <option value={domain.id}>
                                  {domain.id}-{domain.name}
                                </option>
                              )
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup
                          required
                          validationState={this.getValidationState()}
                          controlId='formControlsSelect'
                        >
                          <ControlLabel>Source language*</ControlLabel>
                          <FormControl
                            onChange={this.updateSourceField.bind(this)}
                            name='sourceLanguage'
                            componentClass='select'
                            placeholder='select'
                          >
                            <option value='select'>
                              Select a source language
                            </option>
                            {languages.map(languages => {
                              return (
                                <option value={languages.id}>
                                  {languages.id}-{languages.name}
                                </option>
                              )
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup
                          required
                          controlId='formControlsSelectMultiple'
                          validationState={this.getValidationState()}
                        >
                          <ControlLabel>Target language(s)*</ControlLabel>
                          <FormControl
                            onChange={this.updateTargetField.bind(this)}
                            name='targetLanguage'
                            componentClass='select'
                            placeholder='select'
                            multiple
                          >
                            <option value='select'>
                              Select a target language
                            </option>
                            {languages.map(languages => {
                              return (
                                <option value={languages.id}>
                                  {languages.id}-{languages.name}
                                </option>
                              )
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={5}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>Qualification*</ControlLabel>
                          <FormControl
                            onChange={this.updateQualificationField.bind(this)}
                            componentClass='select'
                            placeholder='select'
                            multiple
                          >
                            <option value='select'>
                              Select the qualification
                            </option>
                            {this.state.constants.qualifications &&
                              this.state.constants.qualifications.map(
                                qualifications => {
                                  return (
                                    <option
                                      value={qualifications.qualificationId}
                                    >
                                      {qualifications.qualificationName}
                                    </option>
                                  )
                                }
                              )}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={5}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>Order*</ControlLabel>
                          <FormControl
                            onChange={this.updateOrderNumberField.bind(this)}
                            required
                            name='orderNumber'
                            type='text'
                            bsClass='form-control'
                            placeholder='Enter the order number'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={5}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>WWC*</ControlLabel>
                          <FormControl
                            onChange={this.updateWWCField.bind(this)}
                            required
                            name='WWC'
                            type='text'
                            bsClass='form-control'
                            placeholder='Enter the WWC'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={5}>
                        <FormGroup required controlId='formControlsSelect'>
                          <ControlLabel>Wordcount*</ControlLabel>
                          <FormControl
                            onChange={this.updateWordcountField.bind(this)}
                            required
                            name='wordcount'
                            type='text'
                            bsClass='form-control'
                            placeholder='Enter the wordcount'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={10}>
                        <FormGroup controlId='formControlsTextarea'>
                          <ControlLabel>Project path*</ControlLabel>
                          <FormControl
                            onChange={this.updateProjectPathField.bind(this)}
                            required
                            name='projectPath'
                            bsClass='form-control'
                            ncols={['col-md-6']}
                            placeholder='Enter the path'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId='formControlsTextarea'>
                          <ControlLabel>Comments</ControlLabel>
                          <FormControl
                            onChange={this.updateCommentsField.bind(this)}
                            rows='5'
                            name='comments'
                            componentClass='textarea'
                            bsClass='form-control'
                            placeholder='Provide your comments and instructions here.'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <ButtonToolbar>
                      <Button
                        onClick={this.handleGenie}
                        onClick={() => {
                          console.log(this.state)
                          api.addTranslationRequest(this.state)
                        }}
                        bsStyle='info'
                        pullRight
                        fill
                        type='submit'
                      >
                        Submit
                      </Button>
                      <Button bsStyle='default' pullRight fill>
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TranslationRequestsForm
