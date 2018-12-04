import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
import api from '../../api'




class EditLanguage extends Component {
  constructor (prop) {
    super(prop)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleIsNeutralLanguage = this.handleIsNeutralLanguage.bind(this)

    this.state = {
     id: [],
     languageCode: [],
     languageName:[],
     isNeutralLanguage: false,
     languages:[]
    }
    console.log(this.state)
    console.log(prop)
  }

  componentDidMount() {
    let arrayOfUrl = (window.location.href.split('/'))
    console.log(arrayOfUrl)
    let newId = arrayOfUrl[4].split("#")[0];
    this.setState({id: newId})
  }
  
  updateState = languages => {
  this.setState({ languages: languages.data })
}

  handleChange(e) {
    const { isNeutralLanguage: key, value } = e.target
    console.log(value)
    this.setState({ [key]: value })
  }

 handleIsNeutralLanguage = event => {
  event.preventDefault()

  let isNeutralLanguage = event.target.isNeutralLanguage
  console.log(event.target.checked)
  this.setState({
    isNeutralLanguage: event.target.checked
  })
}


  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

 /* getValidationState () {
    const { languageName } = this.state
    if (languageName.length > 0) return 'success'
    return 'error'
  }*/

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

    return this.setState({ doc: { ...this.state.doc, [e.target.name]: value } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const languages = this.state
    console.log(languages)
  }

  render () {
    const languages = this.state
    console.log(languages)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title='Edit a language'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup
                          controlId='formBasicText'
                         // validationState={this.getValidationState()}
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
                                placeholder: 'Edit the language name'
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
                           // validationstate={this.getValidationState()}
                            languagecode={this.state.languageCode}
                            ncols={['col-md-6']}
                            proprieties={[
                              {
                                className: 'LanguageCode',
                                type: 'text',
                                name: 'languageCode',
                                bsClass: 'form-control',
                                placeholder: 'Edit the language code'
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
                          onChange={this.handleIsNeutralLanguage}
                        />
                        <label htmlFor='isNeutral'>Is neutral language</label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ButtonToolbar>
                          <Button
                            onClick={() => api.editLanguage(languages)}
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
{/*const mapStateToProps = state => {
  return {
    state
    //languages: state.languages
  }
}

export default connect(mapStateToProps)(EditLanguage)*/}

export default EditLanguage

