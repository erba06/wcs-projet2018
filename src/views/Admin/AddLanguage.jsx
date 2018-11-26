import React, { Component } from 'react'
import Alert from 'react-s-alert'
import {
  Grid,
  Row,
  Col,
  ButtonToolbar,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap'

import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'

class AddLanguage extends Component {
  constructor () {
    super()
    this.state = {
      languageName: '',
      languageCode: '',
      isNeutralLanguage: true
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  getValidationState () {
    const { languageName } = this.state
    if (languageName.length > 0) return 'success'
    return 'error'
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  updateLanguageNameField (event) {
    const languageName = event.target.value
    this.setState({ languageName: event.target.value })
    console.log(languageName)
  }

  updateLanguageCodeField (event) {
    const languageCode = event.target.value
    this.setState({ languageCode: event.target.value })
    console.log(languageCode)
  }

  handleChange = e => {
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value

    return this.setState({
      languages: { ...this.state.languages, [e.target.name]: value }
    })
  }

  handleSubmit = event => {
    console.log(event)
    Alert.success(`Succès`)
    setTimeout(() => {
      window.location = window.location
    }, 500)
  }

  render () {
    const languages = this.state.languages
    console.log(languages)
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title='Add a language'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup
                          controlId='formBasicText'
                          validationstate={this.getValidationState()}
                        >
                          <ControlLabel>Language name</ControlLabel>
                          <FormControl
                            onChange={this.updateLanguageNameField.bind(this)}
                            languagename={this.state.languageName}
                            ncols={['col-md-6']}
                            proprieties={[
                              {
                                className: 'languageName',
                                type: 'text',
                                name: 'languageName',
                                bsClass: 'form-control',
                                placeholder: 'Enter a language name'
                              }
                            ]}
                          />
                          <FormControl.Feedback />
                          <HelpBlock>This field cannot be empty.</HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup controlId='formBasicText'>
                          <ControlLabel>Language code</ControlLabel>
                          <FormControl
                            onChange={this.updateLanguageCodeField.bind(this)}
                            validationstate={this.getValidationState()}
                            languagecode={this.state.languageCode}
                            ncols={['col-md-6']}
                            proprieties={[
                              {
                                className: 'LanguageCode',
                                type: 'text',
                                name: 'languageCode',
                                bsClass: 'form-control',
                                placeholder: 'Enter a language code'
                              }
                            ]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <input
                          type='checkbox'
                          id='isNeutral'
                          checked={this.state.isNeutralLanguage}
                          onChange={this.HandleInputChange}
                        />
                        <label htmlFor='isNeutral'>Is neutral language</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ButtonToolbar>
                          <Button
                            onClick={() => console.log(languages)}
                            bsStyle='info'
                            pullRight
                            fill
                            type='submit'
                          >
                            Submit
                          </Button>
                          <Button
                            bsStyle='default'
                            pullRight
                            fill
                            type='submit'
                          >
                            Cancel
                          </Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
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

export default AddLanguage