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
import api from '../../api'


class AddRole extends Component {
  constructor () {
    super()
    this.state = {
      roleName: '',
      description: ''
    }
  }
  getValidationState () {
    const { roleName } = this.state
    if (roleName.length > 0) return 'success'
    return 'error'
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  updateDomainNameField (event) {
    const roleName = event.target.value
    this.setState({ roleName: event.target.value })
    console.log(roleName)
  }

  updateDescriptionField (event) {
    const languageCode = event.target.value
    this.setState({ description: event.target.value })
    console.log(languageCode)
  }

    handleSubmit = e => {
        e.preventDefault()
        const roles = this.state.roles
    }

  render () {
    const roles = this.state
    console.log(roles)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title='Add a role'
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
                            onChange={this.updateDomainNameField.bind(this)}
                            validationState={this.getValidationState()}
                            ncols={['col-md-6']}
                            proprieties={[
                              {
                                className: 'userName',
                                type: 'text',
                                name: 'userName',
                                bsClass: 'form-control',
                                placeholder: "Add a user role"
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
                          proprieties={[
                            {
                              className: 'LanguageCode',
                              type: 'text',
                              name: 'description',
                              bsClass: 'form-control',
                              placeholder: 'Add a description'
                            }
                          ]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ButtonToolbar>
                          <Button 
                            onClick={() => api.addRole(roles)}
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
                          <Alert stack={{ limit: 3 }} />
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

export default AddRole
