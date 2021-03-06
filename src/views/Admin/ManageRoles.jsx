import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import apiService from '../../api/apiService'
import api from '../../api'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'


class ManageRoles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      roles: []
    }
  }

  componentDidMount () {
    console.log(this.state)
    apiService
      .getApiEndpoint('GetRoles')
      .then(this.updateState)
      .catch(console.log)
    console.log(this.state)
  }

  updateState = roles => {
    this.setState({ roles: roles.data })
  }
  deleteRole = prop => {
    apiService
      .getApiEndpoint('DeleteRole', null, { id: prop.id })
      .then(res => console.log(res))
  }

  render () {
    const roles = this.state.roles
    console.log('render')
    console.log(roles)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Manage User Roles'
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
                          <th>Id</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th />
                        </tr>
                      </thead>

                      <tbody>
                        {roles.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>{prop.name}</td>
                              <td>{prop.description}</td>
                              <td>
                                {/* <ButtonGroup className='buttonManagePages'> */}
                                <Link to='/editrole/:id'>
                                  <Button
                                    onClick={() => api.getRole(prop.id)}
                                    bsSize='default'
                                    bsStyle='primary'
                                    fill
                                  >
                                    <i className='far fa-edit' /> Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => api.deleteRole(prop.id)}
                                  bsSize='default'
                                  bsStyle='info'
                                  fill
                                >
                                  <i className='fas fa-trash-alt' /> Delete
                                </Button>
                                <Button
                                  onClick={() => api.loginAsRole(prop.id)}
                                  bsSize='default'
                                  fill
                                >
                                  {' '}
                                  Login as
                                </Button>
                                {/* } </ButtonGroup> */}
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
              <Link to='/addrole'>
                <Button bsStyle='info' pullLeft fill type='submit'>
                  Add role
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ManageRoles
