import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { Grid, Row, Col, ButtonToolbar, FormControl } from 'react-bootstrap'
import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'
import apiService from '../../api/apiService'
import api from '../../api'            

class EditDomain extends Component {
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
            <Col md={10}>
              <Card
                title='Edit a domain'
                content={
                  <Row>
                    <Col md={6}>
                      <form action='#' onSubmit={this.handleSubmit.bind(this)}>
                        <FormControl
                          onChange={this.updateDomainField.bind(this)}
                          ncols={['col-md-6']}
                          proprieties={[
                            {
                              className: 'Domain',
                              type: 'text',
                              name: 'domain',
                              bsClass: 'form-control',
                              placeholder: 'Edit the domain'
                            }
                          ]}
                        />
                        <Row>
                          <Col md={12}>
                            <ButtonToolbar>
                              <Button
                                onClick={() => api.editDomain(this.state)}
                                bsStyle='info'
                                pullLeft
                                fill
                                type='submit'
                              >
                                Edit
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

export default EditDomain
