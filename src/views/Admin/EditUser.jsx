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

import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'
import api from '../../api'
import apiService from '../../api/apiService'

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

class EditUser extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userRoles: [],
      roles: [],
      source: [],
      target: [],
      domains: [],
      selectedRoles: [1],
      errors: []
    }
    console.log(this.state)
    this.updateRolesField = this.updateRolesField.bind(this)
    this.updateDomainsField = this.updateDomainsField.bind(this)
    this.updateTargetField = this.updateTargetField.bind(this)
    this.updateSourceField = this.updateSourceField.bind(this)
    this.compareRoles = this.compareRoles.bind(this)
  }

  componentDidMount () {
    let arrayOfUrl = window.location.href.split('/')
    let newId = arrayOfUrl[4].split('#')[0]
    this.setState({ id: newId })

    apiService.getApiEndpoint('GetRoles').then(roles => {
      this.setState({ roles: roles.data })
    })

    apiService.getApiEndpoint('GetAccount', null, { id: newId }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.setState({ firstName: res.data.firstName })
        this.setState({ lastName: res.data.lastName })
        this.setState({ userName: res.data.userName })
        this.setState({ email: res.data.emailAddress })
        this.setState({ confirmPassword: res.data.confirmpassword })
        this.setState({ userRoles: res.data.roles })

        if (res.data.sources.length === 1) {
          this.setState({ source: res.data.sources[0].languageName })
        } else {
          this.setState({
            source: res.data.sources.map(t => t.languageName)
          })
        }
        if (res.data.targets.length === 1) {
          this.setState({ target: res.data.targets[0].languageName })
        } else {
          this.setState({
            target: res.data.targets.map(t => t.languageName)
          })
          console.log(this.state)
        }
        if (res.data.domains.length === 1) {
          this.setState({ domains: res.data.domains[0].domainName })
        } else {
          this.setState({
            domains: res.data.domains.map(dom => dom.domainName)
          })
          this.compareRoles(), res => this.setState({ selectedRoles: res })
        }
      }
    })
  }

  validate (name, email, password) {
    // we are going to store errors for all fields
    // in a signle array
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
  /* compare user's roles to list of roles to get the id of the selected roles()
and use them to update the selectedRoles state which highlight the selected
roles in the dropdown list */
  compareRoles () {
    let arrSelectedRoles = []
    for (var i = 0; i < this.state.userRoles.length; i++) {
      for (var j = 0; j < this.state.roles.length; j++) {
        if (this.state.roles[j].name == this.state.userRoles[i]) {
          arrSelectedRoles.push(this.state.roles[j].id)
        }
      }
    }
    console.log(arrSelectedRoles)

    this.setState({ selectedRoles: arrSelectedRoles })
    console.log(this.state)
  }

  updateFirstNameField (event) {
    const firstName = event.target.value
    this.setState({ firstName }) //  autre methode this.setState({ firstName: event.target.value})
    console.log(firstName)
  }

  updateLastNameField (event) {
    const lastName = event.target.value
    this.setState({ lastName })
    console.log(lastName)
  }

  updateUserNameField (event) {
    const userName = event.target.value
    this.setState({ userName })
    console.log(userName)
  }

  updateEmailField (event) {
    const email = event.target.value
    this.setState({ email })
  }

  updatePasswordField (event) {
    const password = event.target.value
    this.setState({ password })
  }

  updateConfirmPasswordField (event) {
    const confirmPassword = event.target.value
    this.setState({ confirmPassword })
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
    const source = event.target.value
    this.setState({ source })
  }
  updateTargetField (event) {
    const target = event.target.value
    this.setState({ target })
  }

  updateDomainsField (event) {
    const domains = event.target.value
    this.setState({ domains })
  }

  handleSubmit = event => {
    event.preventDefault()
    const user = this.state
    console.log(user)
  }

  handleGenie (event) {
    event.preventDefault()
    alert.success('User has been updated!', {
      position: 'bottom-right',
      effect: 'genie'
    })
  }

  render () {
    const roles = this.state.roles
    const { errors } = this.state
    const user = this.state
    console.log(this.state)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Edit user'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      {errors.map(error => (
                        <p key={error}>Error: {error}</p>
                      ))}
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
                                  value={this.state.firstName}
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
                                  value={this.state.lastName}
                                  autoFocus
                                  onChange={this.updateLastNameField.bind(this)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup controlId='userName-id' bsSize='large'>
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
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
                                  value={this.state.password}
                                  onChange={this.updatePasswordField.bind(this)}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup
                                controlId='confirmPassword-id'
                                bsSize='large'
                              >
                                <ControlLabel>Confirm password</ControlLabel>
                                <FormControl
                                  value={this.state.confirmPassword}
                                  onChange={this.updateConfirmPasswordField.bind(
                                    this
                                  )}
                                  type='password'
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
                                  {roles.map(roles => {
                                    return (
                                      <option value={roles.id}>
                                        {roles.id}-{roles.name}
                                      </option>
                                    )
                                  })}
                                </FormControl>
                              </FormGroup>
                              {/* {this.state.userRoles} */}
                              {/* <FormGroup controlId='role-id' bsSize='large'>
                                <ControlLabel>
                                  Role(s) within the organisation
                                </ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
                                  name='roles'
                                  value={this.state.roles}
                                  onChange={this.updateRolesField.bind(this)}
                                />
                                </FormGroup> */}
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='domain-id' bsSize='large'>
                                <ControlLabel>Domain(s)</ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
                                  name='domain'
                                  value={this.state.domains}
                                  onChange={this.updateDomainsField.bind(this)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup controlId='password' bsSize='large'>
                                <ControlLabel>
                                  Source language (for translator role)
                                </ControlLabel>
                                <FormControl
                                  value={this.state.source}
                                  onChange={this.updateSourceField.bind(this)}
                                  type='text'
                                  name='source'
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='target' bsSize='large'>
                                <ControlLabel>
                                  Target language (for translator role)
                                </ControlLabel>
                                <FormControl
                                  value={this.state.target}
                                  onChange={this.updateTargetField.bind(this)}
                                  type='text'
                                  name='target'
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </fieldset>
                      </Col>
                    </Row>
                    <ButtonToolbar>
                      <Button
                        onClick={this.handleGenie}
                        onClick={() => {
                          console.log(user)
                          api.editUser(user)
                        }}
                        bsStyle='info'
                        pullRight
                        fill
                        type='submit'
                      >
                        Submit
                      </Button>
                      <Button bsStyle='default' pullRight fill type='submit'>
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

export default EditUser
