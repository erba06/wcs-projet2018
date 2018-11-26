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

// import api from 'api/api.jsx'

class AddUser extends Component {
  constructor () {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      userName: '',
      email: '',
      password: '',
      confirmpassword: '',
      roles: '',
      source: '',
      target: '',
      domains: '',

      errors: []
    }
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

  /* handleSubmit = (e) => {
      e.preventDefault();

      const { name, email, password } = this.state;

      const errors = this.validate(name, email, password);
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }
  }
  */

  updateFirstNameField (event) {
    const firstName = event.target.value
    this.setState({ firstName }) //  autre methode this.setState({ firstName: event.target.value})
    console.log(firstName)
  }

  updateLastNameField (event) {
    const lastname = event.target.value
    this.setState({ lastname })
    console.log(lastname)
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
    const roles = event.target.value
    this.setState({ roles })
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
    const domain = event.target.value
    this.setState({ domain })
  }

  /*
    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    */

  /* fetch('/translationRequests',
      {
          method:  'POST',
          headers:  new  Headers({
              'Content-Type':  'application/json'
          }),
          body:  JSON.stringify(this.state),
      })
      .then(res => res.json()) */

  handleGenie (event) {
    event.preventDefault()
    Alert.success('User has been updated!', {
      position: 'bottom-right',
      effect: 'genie'
    })
  }

  render () {
    const { errors } = this.state

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
                      {errors.map(error => <p key={error}>Error: {error}</p>)}
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
                              <FormGroup controlId='role-id' bsSize='large'>
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
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup controlId='domain-id' bsSize='large'>
                                <ControlLabel>Domain(s)</ControlLabel>
                                <FormControl
                                  type='text'
                                  autoFocus
                                  name='domain'
                                  value={this.state.domain}
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

export default AddUser
