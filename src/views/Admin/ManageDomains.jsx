import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Alert from 'react-s-alert'
import { ButtonGroup, Grid, Row, Col, Table } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import apiService from '../../api/apiService'
import api from '../../api'

class ManageDomains extends Component {
  constructor (props) {
    super(props)
    this.state = {
      domains: [],
      id: null
    }
    // this.handleClick = this.handleClick.bind(this);
    console.log(this.state)
  }

  componentDidMount () {
    console.log(this.state)
    apiService.getApiEndpoint('GetDomains').then(this.updateState)
    console.log(this.state)
  }

  updateState = domains => {
    this.setState({ domains: domains.data })
  }
  updateId = prop => {
    console.log(prop)
    this.setState({ id: prop.id })
    console.log(prop.id)
  }

  handleClick = prop => {
    console.log(prop)
    this.setState({ id: prop.id })
    this.setState({ name: prop.name })
    console.log(this.props)
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
                title='Manage Domains'
                category='Your internal translation requests marketplace'
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <ul className='breadcrumb'>
                      <li>
                        <Link to='/manageusers'>
                          <a href='ManageUsersPage'>Manage Users</a>
                        </Link>
                      </li>
                      <li>
                        <Link to='/manageroles'>
                          <a href='ManageRolesPage'>Manage Roles</a>
                        </Link>
                      </li>
                      <li>
                        <Link to='/managelanguages'>
                          <a href='ManageLanguagesPage'>Manage Languages</a>
                        </Link>
                      </li>
                    </ul>
                    <Table striped hover>
                      <div id='tableGoesHere' class='col-md-6' />
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Domain Name</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {domains.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>
                                <ol>{prop.name}</ol>
                              </td>
                              <td>
                             {/*}   <ButtonGroup className='buttonManagePages'> */}
                                  <Link to='/editdomain/:id'>
                                    <Button
                                      onClick={() => api.getDomain(prop.id)}
                                      bsSize='default'
                                      bsStyle='primary'
                                      fill
                                    >
                                      <i class='far fa-edit' /> Edit
                                    </Button>
                                  </Link>
                                  <Button
                                    onClick={() => api.deleteDomain(prop.id)}
                                    bsSize='default'
                                    bsStyle='info'
                                    fill
                                  >
                                    <i class='fas fa-trash-alt' /> Delete
                                  </Button>
                         {/*} </ButtonGroup> */}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                }
              />
              <Link to='/adddomain'>
                <Button bsStyle='info' pullLeft fill type='submit'>
                  Add domain
                </Button>
                <Alert stack={{ limit: 3 }} />
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ManageDomains
