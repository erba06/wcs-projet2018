import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
    console.log(this.state)
  }

  componentDidMount () {
    let arrayOfUrl = window.location.href.split('/')
    console.log(arrayOfUrl)
    let newId = arrayOfUrl[4].split('#')[0]
    this.setState({ id: newId })
    apiService.getApiEndpoint('GetDomain', null, { id: newId }).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.setState({ domains: res.data.name })
      }
    })
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  // updateState = domains => {
  //  this.setState({ domains: domains.data })
  //  console.log(domains)
  // }

  updateDomainField = event => {
    const domains = event.target.value
    this.setState({ domains: event.target.value })
    console.log(domains)
  }

  handleSubmit = e => {
    e.preventDefault()
    const domains = this.state.domains
    console.log(domains)
  }

  render () {
    const domains = this.state
    console.log(domains)

    console.log('REDUX:' + this.props)

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
                      <form action='#' onSubmit={this.handleSubmit}>
                        <FormControl
                          onChange={this.updateDomainField.bind(this)}
                          value={this.state.domains}
                          ncols={['col-md-6']}
                          placeholder='Edit the domain'
                          proprieties={[
                            {
                              className: 'Domain',
                              type: 'text',
                              name: 'domains',
                              bsClass: 'form-control'
                            }
                          ]}
                        />
                        <Row>
                          <Col md={12}>
                            <ButtonToolbar>
                              <Button
                                onClick={() => {
                                  console.log(domains)
                                  api.editDomain(domains)
                                }}
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
const mapStateToProps = state => {
  return {
    domains: state.domains
  }
}

export default connect(mapStateToProps)(EditDomain)
