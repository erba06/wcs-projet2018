import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import { ButtonGroup } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import { Link, withRouter } from 'react-router-dom'
import apiService from '../../api/apiService'
import api from '../../api'

class ManageUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    let arrayOfUrl = window.location.href.split('/')
    let newId = arrayOfUrl[4].split('#')[0]
    console.log('THE_PATH_MANAGE: ' + arrayOfUrl + newId)

    console.log(this.state)
    apiService
      .getApiEndpoint('GetAccounts')
      .then(this.updateState)
      .catch(console.log)
    console.log(this.state)
  }

  updateState = accounts => {
    this.setState({ users: accounts.data.items })
  }

  deactivateUser = prop => {
    apiService.getApiEndpoint('PutAccount', { id: prop.id }, { active: false })
    console.log(prop.id)
  }

  render () {
    const users = this.state.users
    console.log('render')
    console.log(users)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Manage Users'
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <ul className='breadcrumb'>
                      <li>
                        <Link to='/manageroles'>
                          <a href='ManageRolePage'>Manage Roles </a>
                        </Link>
                      </li>
                      <li>
                        <Link to='/managelanguages'>
                          <a href='ManageLanguagesPage'>Manage Languages</a>
                        </Link>
                      </li>
                      <li>
                        <Link to='/managedomains'>
                          <a href='ManageDomainsPage'>Manage Domains</a>
                        </Link>
                      </li>
                    </ul>
                    <Table striped hover>
                      <div id='tableGoesHere' className='col-md-6' />

                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Domains</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Source languages</th>
                          <th>Target language</th>
                          <th>Active</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((prop, index) => {
                          return (
                            <tr>
                              <td key={prop.id}>
                                {prop.firstName + ' ' + prop.lastName}
                              </td>
                              <td>
                                {prop.domains.length === 0
                                  ? 'N/A'
                                  : prop.domains.length === 1
                                    ? prop.domains[0].domainName
                                    : prop.domains.map(arrayOfDomains => (
                                      <li key={prop.index} className="domainName">
                                        {arrayOfDomains.domainName}
                                      </li>
                                    ))}
                              </td>
                              <td>{prop.emailAddress}</td>
                              <td>
                                {prop.roles.length === 1
                                  ? prop.roles
                                  : prop.roles.map((roles, key) => (
                                    <li key={key}>{roles}</li>
                                  ))}
                              </td>
                              <td>
                                {prop.sources.length === 0
                                  ? 'N/A'
                                  : prop.sources.length === 1
                                    ? prop.sources[0].languageName
                                    : prop.sources.map(arrayOfSources => (
                                      <li>{arrayOfSources.languageName}</li>
                                    ))}
                              </td>
                              <td>
                                {prop.targets.length === 0
                                  ? 'N/A'
                                  : prop.targets.length === 1
                                    ? prop.targets[0].languageName
                                    : prop.targets.map(arrayOfTargets => (
                                      <li>{arrayOfTargets.languageName}</li>
                                    ))}
                              </td>
                              <td>{prop.active === true ? 'Yes' : 'No'}</td>
                              <td>
                                <ButtonGroup>
                                  <div className='buttonGroup'>
                                    <Link to='/edituser/:id'>
                                      <Button
                                        onClick={() => api.getUser(prop.id)}
                                        bsStyle='primary'
                                        fill
                                      >
                                        <i className='far fa-edit' /> Edit
                                      </Button>
                                    </Link>
                                    <Button
                                      onClick={() =>
                                        this.deactivateUser(prop.id)
                                      }
                                      bsStyle='success'
                                      fill
                                    >
                                      {' '}
                                      Deactivate
                                    </Button>
                                    <Button
                                      onClick={() => api.deleteUser(prop)}
                                      bsStyle='info'
                                      fill
                                    >
                                      <i className='fas fa-trash-alt' /> Delete
                                    </Button>
                                    <Button
                                      onClick={() => api.loginAsUser(prop.id)}
                                      bsStyle='default'
                                      fill
                                    >
                                      {' '}
                                      Login as
                                    </Button>
                                  </div>
                                </ButtonGroup>
                                <Alert stack={{ limit: 3 }} />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
          <Link to='/adduser'>
            <Button bsStyle='info' pullleft='true' fill type='submit'>
              Add user
            </Button>
          </Link>
        </Grid>
      </div>
    )
  }
}

export default withRouter(ManageUsers)
