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

// import api from 'api/api.jsx'

class TranslationRequestsForm extends Component {
  constructor () {
    super()
    this.state = {
      requestType: '',
      deadline: '',
      clientName: '',
      domain: '',
      sourceLanguage: '',
      targetLanguage: '',
      qualification: '',
      orderNumber: '',
      pathName: '',
      comments: '',
      flash: ''
    }
  }

  updateRequestTypeField (event) {
    const requestType = event.target.value
    this.setState({ requestType }) //  autre methode this.setState({ requestType: event.target.value})
  }

  updateDeadlineField (event) {
    const deadline = event.target.value
    this.setState({ deadline })
    console.log(deadline)
  }

  updateClientNameField (event) {
    const clientName = event.target.value
    this.setState({ clientName })
    console.log(clientName)
  }

  updateDomainField (event) {
    const domain = event.target.value
    this.setState({ domain })
  }

  updateSourceLanguageField (event) {
    const sourceLanguage = event.target.value
    this.setState({ sourceLanguage })
  }

  updateTargetField (event) {
    const targetLanguage = event.target.value
    this.setState({ targetLanguage })
  }

  updateQualificationField (event) {
    const qualification = event.target.value
    this.setState({ qualification })
  }

  updateOrderNumberField (event) {
    const orderNumber = event.target.value
    this.setState({ orderNumber })
    console.log(orderNumber)
  }

  updatePathNameField (event) {
    const pathName = event.target.value
    this.setState({ pathName })
    console.log(pathName)
  }
  updateCommentsField (event) {
    const comments = event.target.value
    this.setState({ comments })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch('/auth/signup',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(
        res => this.setState({ 'flash': res.flash }),
        err => this.setState({ 'flash': err.flash })
      )
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
    if (sourceLanguage === targetLanguage && sourceLanguage !== 'select') return 'error'
    else if (sourceLanguage === targetLanguage && sourceLanguage === 'select') return null
    else if (sourceLanguage === targetLanguage && ((sourceLanguage === 'select') || (targetLanguage === 'select'))) return null
    else if (sourceLanguage !== targetLanguage && ((sourceLanguage !== 'select') && (targetLanguage !== 'select'))) return 'success'
    else if ((sourceLanguage === 'select') || (targetLanguage === 'select')) return null
    else if (sourceLanguage !== targetLanguage && (sourceLanguage === 'select' || targetLanguage === 'select')) return 'success'
    return null
  }

  render () {
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
                          controlId='formControlsSelect'>
                          <ControlLabel>Request type*</ControlLabel>
                          <FormControl onChange={this.updateRequestTypeField.bind(this)}
                            componentClass='select'
                            placeholder='select'>
                            <option value='select'>Request type</option>
                            <option value='translation'>Translation</option>
                            <option value='review'>Review</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup
                          required
                          controlId='formControlsSelect'>
                          <ControlLabel>Deadline*</ControlLabel>
                          <DatePicker
                            name='deadline'
                            onChange={this.updateDeadlineField.bind(this)} />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup
                          controlId='formControlsTextarea'>
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
                        <FormGroup
                          required
                          controlId='formControlsSelect'>
                          <ControlLabel>Domain*</ControlLabel>
                          <FormControl
                            name='domain'
                            onChange={this.updateDomainField.bind(this)}
                            componentClass='select'
                            placeholder='select'>
                            <option value='select'>Select a domain</option>
                            <option value='industry'>Industry</option>
                            <option value='finance'>Finance</option>
                            <option value='medical'>Medical</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup
                          required
                          validationState={this.getValidationState()}
                          controlId='formControlsSelect'>
                          <ControlLabel>Source language*</ControlLabel>
                          <FormControl
                            onChange={this.updateSourceLanguageField.bind(this)}
                            name='sourceLanguage'
                            componentClass='select'
                            placeholder='select'>
                            <option value='select'>Select a source language</option>
                            <option value='french'>French</option>
                            <option value='german'>German</option>
                            <option value='english'>English</option>
                            <option value='italian'>Italian</option>
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
                            multiple
                          >
                            <option value='select'>Select a target language</option>
                            <option value='french'>French</option>
                            <option value='english'>English</option>
                            <option value='italian'>Italian</option>
                            <option value='spanish'>Spanish</option>
                            <option value='german'>German</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={5}>
                        <FormGroup
                          required
                          controlId='formControlsSelect'>
                          <ControlLabel>Qualification*</ControlLabel>
                          <FormControl
                            onChange={this.updateQualificationField.bind(this)}
                            componentClass='select'
                            placeholder='select'
                            multiple
                          >
                            <option value='select'>Select the qualification</option>
                            <option value='C0'>C0</option>
                            <option value='C1'>C1</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={5}>
                        <FormGroup
                          required
                          controlId='formControlsSelect'>
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
                      <Col md={10}>
                        <FormGroup
                          controlId='formControlsTextarea'>
                          <ControlLabel>Path*</ControlLabel>
                          <FormControl
                            onChange={this.updatePathNameField.bind(this)}
                            required
                            name='pathName'
                            bsClass='form-control'
                            ncols={['col-md-6']}
                            placeholder='Enter the path'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup
                          controlId='formControlsTextarea'>
                          <ControlLabel>Comments</ControlLabel>
                          <FormControl onChange={this.updateCommentsField.bind(this)}
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
                      <Button onClick={this.handleGenie} onClick={this.handleSubmit} bsStyle='info' pullRight fill type='submit'>
                          Submit
                      </Button>
                      <Button bsStyle='default' pullRight fill >
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
