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
import apiService from '../../api/apiService'
import api from '../../api'

class EditRole extends Component {
  constructor () {
    super()
    this.state = {
      roleName: '',
      description: '',
      id: ''
    }
  }
  getValidationState () {
    const { roleName } = this.state
    if (roleName.length > 0) return 'success'
    return 'error'
  }

  componentDidMount () {
    let arrayOfUrl = window.location.href.split('/')
    console.log(arrayOfUrl)
    let newId = arrayOfUrl[4].split('#')[0]
    this.setState({ id: newId })
    apiService.getApiEndpoint('GetRole', null, { id: newId }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.setState({ roleName: res.data.name })
        this.setState({ description: res.data.description })
      }
    })
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  updateRoleNameField (event) {
    const roleName = event.target.value
    this.setState({ roleName: event.target.value })
    console.log(roleName)
  }

  updateDescriptionField (event) {
    const description = event.target.value
    this.setState({ description: event.target.value })
    console.log(description)
  }

  handleSubmit = event => {
    event.preventDefault()
    const roles = this.state
    console.log(roles)
  }

  render () {
    const roles = this.state.roleName
    console.log(roles)
    const description = this.state.description
    console.log(description)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title='Edit a role'
                content={
                  <form action='#' onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup
                          controlId='formBasicText'
                          validationState={this.getValidationState()}
                        >
                          <ControlLabel>Name</ControlLabel>
                          <FormControl
                            onChange={this.updateRoleNameField.bind(this)}
                            validationState={this.getValidationState()}
                            placeholder='Edit the user role'
                            value={this.state.roleName}
                            ncols={['col-md-6']}
                            proprieties={[
                              {
                                className: 'roleName',
                                type: 'text',
                                name: 'roleName',
                                bsClass: 'form-control'
                              }
                            ]}
                          />
                          <FormControl.Feedback />
                          <HelpBlock>
                            Validation is based on string length.
                          </HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                          onChange={this.updateDescriptionField.bind(this)}
                          validationState={this.getValidationState()}
                          languageCode={this.state.languageCode}
                          ncols={['col-md-6']}
                          placeholder='Edit the description'
                          value={this.state.description}
                          proprieties={[
                            {
                              className: 'LanguageCode',
                              type: 'text',
                              name: 'description',
                              bsClass: 'form-control'
                            }
                          ]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ButtonToolbar>
                          <Button
                            onClick={() => api.editRole(roles)}
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

export default EditRole
