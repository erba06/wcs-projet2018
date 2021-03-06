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
import apiService from '../../api/apiService'
import api from '../../api'

class AddUser extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roles: [],
      languages: [],
      domains: [],
      accounts: [],
      errors: [],
      selectedDomains: [],
      selectedRoles: [],
      selectedSources: [],
      selectedTargets: []
    }
    console.log(this.state)
    this.updateRolesField = this.updateRolesField.bind(this)
    this.updateDomainsField = this.updateDomainsField.bind(this)
    this.updateTargetField = this.updateTargetField.bind(this)
    this.updateSourceField = this.updateSourceField.bind(this)
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
  }
  componentDidMount () {
    this.syncDatas()
  }

  validate (name, email, password) {
    // we are going to store errors for all fields
    // in a single array
    const errors = []

    if (name.length === 0) {
      errors.push("Name can't be empty")
    }

    if (email.length < 5) {
      errors.push('Email should be at least 5 charcters long')
    }
    if (email.split('').filter(x => x === '@').length !== 1) {
      errors.push('Email should contain a @')
    }
    if (email.indexOf('.') === -1) {
      errors.push('Email should contain at least one dot')
    }

    if (password.length < 6) {
      errors.push('Password should be at least 6 characters long')
    }

    return errors
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  updateFirstNameField (event) {
    const firstName = event.target.value
    this.setState({ firstName: event.target.value }) //  autre methode this.setState({ firstName: event.target.value})
    console.log(firstName)
  }

  updateLastNameField (event) {
    const lastName = event.target.value
    this.setState({ lastName: event.target.value })
    console.log(lastName)
  }

  updateUserNameField (event) {
    const userName = event.target.value
    this.setState({ userName: event.target.value })
    console.log(userName)
  }

  updateEmailField (event) {
    const email = event.target.value
    this.setState({ email: event.target.value })
  }

  updatePasswordField (event) {
    const password = event.target.value
    this.setState({ password: event.target.value })
  }

  updateConfirmPasswordField (event) {
    const confirmPassword = event.target.value
    this.setState({ confirmPassword: event.target.value })
  }

  updateRolesField (event) {
    let opts = []

    let opt

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i]

      if (opt.selected) {
        opts.push(parseInt(opt.value))
      }
    }
    console.log('opts: ', opts)
    this.setState({ selectedRoles: opts })
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
    this.setState({ selectedSources:opts })
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

  updateDomainsField = event => {
    let opts = []

    let opt

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i]

      if (opt.selected) {
        opts.push(parseInt(opt.value))
      }
    }
    console.log('opts: ', opts)
    this.setState({ selectedDomains: opts })
  }

  handleGenie (event) {
    event.preventDefault()
    Alert.success('User has been updated!', {
      position: 'bottom-right',
      effect: 'genie'
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const accounts = this.state.accounts
  }

  render () {
    const roles = this.state.roles
    const accounts = this.state.accounts
    const domains = this.state.domains
    const languages = this.state.languages
    const selectedRoles = this.state.selectedRoles
    const selectedSources = this.state.selectedSources
    const selectedTargets = this.state.selectedTargets
    const selectedDomains = this.state.selectedDomains
    const selectedRoleId = this.state.selectedRoleId
    console.log(this.state)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Add user'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      {/*  {errors.map(error => <p key={error}>Error: {error}</p>)} */}
                      <Col md={12}>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>
                            Contact info
                          </legend>
                          <Row>
                            <Col md={6}>
                              <FormGroup
                                controlId='firstName-id'
                                bsSize='large'
                              >
                                <ControlLabel>First name</ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
                                  name='firstName'
                                  onChange={this.updateFirstNameField.bind(
                                    this
                                  )}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='lastName-id' bsSize='large'>
                                <ControlLabel>Last name</ControlLabel>
                                <FormControl
                                  type='text'
                                  name='lastName'
                                  autoFocus
                                  onChange={
                                    this.updateLastNameField.bind(this) // value={this.state.lastName}
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup
                                autocomplete='new-password'
                                controlId='userName-id'
                                bsSize='large'
                              >
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                  type='text'
                                  onFocus
                                  name='userName'
                                  value={this.state.userName}
                                  onChange={this.updateUserNameField.bind(this)}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='email-id' bsSize='large'>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
                                  name='email'
                                  value={this.state.email}
                                  onChange={this.updateEmailField.bind(this)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup controlId='password-id' bsSize='large'>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                  type='text'
                                  name='password'
                                  onChange={
                                    this.updatePasswordField.bind(this) // value={this.state.password}
                                  }
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup
                                controlId='confirmPassword-id'
                                bsSize='large'
                                autocomplete='off'
                              >
                                <ControlLabel>Confirm password</ControlLabel>
                                <FormControl
                                  onChange={
                                    this.updateConfirmPasswordField.bind(this) // value={this.state.confirmPassword}
                                  }
                                  type='text'
                                  name='confirmPassword'
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </fieldset>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <fieldset className='scheduler-border'>
                          <legend className='scheduler-border'>
                            Role & Language info
                          </legend>
                          <Row>
                            <Col md={6}>
                              <FormGroup controlId='formControlsSelectMultipleRole'>
                                <ControlLabel>
                                  Role(s) within the organisation
                                </ControlLabel>
                                <FormControl
                                  componentClass='select'
                                  multiple
                                  onChange={this.updateRolesField.bind(this)}
                                  value={this.state.selectedRoles}
                                >
                                  <option value='select'>
                                    select (multiple)
                                  </option>
                                  {roles.map((roles, index) => {
                                    return (
                                      <option value={roles.id}>
                                        {roles.id}-{roles.name}
                                      </option>
                                    )
                                  })}
                                </FormControl>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='formControlsSelectMultiple'>
                                <ControlLabel>Domains</ControlLabel>
                                <FormControl
                                  componentClass='select'
                                  onChange={this.updateDomainsField}
                                  value={this.state.selectedDomains}
                                  multiple
                                >
                                  <option value='select'>
                                    select (multiple)
                                  </option>
                                 {domains.map((domain) => {
                                    return (
                                      <option value={domain.id}>
                                        {domain.id}-{domain.name}
                                      </option> 
                                    )
                                  })}
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup controlId='formControlsSelectMultiple'>
                                <ControlLabel>
                                  Source language (for translator role)
                                </ControlLabel>
                                <FormControl
                                  componentClass='select'
                                  multiple
                                  onChange={this.updateSourceField.bind(this)}
                                  value={this.state.selectedSources}
                                >
                                  <option value='select'>
                                    select (multiple)
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
                            <Col md={6}>
                              <FormGroup controlId='formControlsSelectMultiple'>
                                <ControlLabel>
                                  Target language (for translator role)
                                </ControlLabel>
                                <FormControl
                                  componentClass='select'
                                  multiple
                                  onChange={this.updateTargetField.bind(this)}
                                  value={this.state.selectedTargets}
                                >
                                  <option value='select'>
                                    select (multiple)
                                  </option>
                                  {languages.map((languages) => {
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
                        </fieldset>
                      </Col>
                    </Row>
                    <ButtonToolbar>
                      <Button
                        onClick={() => {
                          console.log(this.state)
                          api.addUser(this.state)
                        }}
                        bsStyle='info'
                        pullRight
                        fill
                        type='submit'
                      >
                        {/* } onClick={this.handleGenie} */}
                        Submit
                      </Button>
                      <Button bsStyle='default' pullRight fill type='submit'>
                        Cancel
                      </Button>
                    </ButtonToolbar>
                    <Alert stack={{ limit: 3 }} />
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

export default AddUser
