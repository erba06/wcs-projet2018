import React, { Component } from 'react'
import Alert from 'react-s-alert'
import {
  Grid,
  Row,
  Col,
  ButtonToolbar,
  FormControl,
  ControlLabel,
  Checkbox,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'
import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'
// import Select from 'react-dropdown-select'
import apiService from '../../api/apiService'
import api from '../../api'

class AddAbsence extends Component {
  constructor (props) {
    super(props)
    this.state = {
      domains: [],
      id: []
    }
  }

  componentDidMount () {
    console.log(this.state)
    apiService
      .getApiEndpoint('GetDomains')
      .then(res => this.updateState(res))
      .catch(console.log)
  }

  updateState = domains => {
    this.setState({ domains: domains.data })
    console.log(domains)
  }

  updateDomainField = event => {
    const domains = event.target.value
    this.setState({ domains: event.target.value })
    console.log(domains)
  }

  handleSubmit = e => {
    e.preventDefault()
    const domains = this.state.domains
  }

  render () {
    const domains = this.state.domains
    console.log(domains)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Manage absences'
                content={
                  <Row>
                    <Col md={12}>
                      <form action='#' onSubmit={this.handleSubmit.bind(this)}>
                        <div className='absence-date-title'>
                          <i class='fas fa-plus-square' />
                          <span>Add an absence</span>
                        </div>

                        <div className='absence-dates'>
                          <Col md={4}>
                            <ControlLabel>Start date</ControlLabel>
                            <FormControl
                              className='start-date'
                              onChange={this.updateDomainField.bind(this)}
                            />
                            <Checkbox>AM</Checkbox>
                            <Checkbox>PM</Checkbox>
                          </Col>
                          <Col md={4}>
                            <ControlLabel>End date</ControlLabel>
                            <FormControl
                              onChange={this.updateDomainField.bind(this)}
                            />
                          </Col>
                        </div>

                       {/* <Select options={['red', 'blue', 'green']} onChange={(values) => this.setValues(values)} /> */}

                        <Row>
                          <Col md={12}>
                            <ButtonToolbar>
                              <Button
                                onClick={() => api.addDomain(domains)}
                                bsStyle='info'
                                pullLeft
                                fill
                                type='submit'
                              >
                                Submit
                              </Button>
                              <Button
                                bsStyle='default'
                                pullLeft
                                fill
                                type='submit'
                              >
                                Cancel
                              </Button>
                            </ButtonToolbar>
                            <Alert stack={{ limit: 3 }} />
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default AddAbsence
