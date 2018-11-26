import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import apiService from '../../api/apiService'
import api from '../../api'

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

    return <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card title="Manage User Roles" category="Your internal translation requests marketplace" ctTableFullWidth ctTableResponsive content={<div>
                    <ul className="breadcrumb">
                      <li>
                        <a href="ManageUsersPage">Manage Users</a>
                      </li>
                      <li>
                        <a href="ManageLanguagesPage">Manage Languages</a>
                      </li>
                      <li>
                        <a href="ManageDomainsPage">Manage Domains</a>
                      </li>
                    </ul>
                    <Table striped hover>
                      <div id="tableGoesHere" className="col-md-6" />
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
                          return <tr key={key}>
                              <td>{prop.id}</td>
                              <td>{prop.name}</td>
                              <td>{prop.description}</td>
                              <td>
                                <ButtonGroup className="buttonManagePages">
                                  <Link to="/editrole">
                                    <Button 
                                      onClick={() => api.editRole(prop.id)}  
                                      bsSize="sm" 
                                      bsStyle="primary" 
                                      fill>
                                      <i className="far fa-edit" /> Edit
                                    </Button>
                                  </Link>
                                  <Button onClick={() => this.deleteRole(prop.id)} bsSize="sm" bsStyle="info" fill>
                                    <i class="fas fa-trash-alt" /> Delete
                                  </Button>
                                  <Button bsSize="sm" fill>
                                    {' '}
                                    Login as
                                  </Button>
                                </ButtonGroup>
                              </td>
                            </tr>;
                        })}
                      </tbody>
                    </Table>
                  </div>} />
              <Link to="/addrole">
                <Button bsStyle="info" pullLeft fill type="submit">
                  Add role
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>;
  }
}

export default ManageRoles
