import React, { Component } from 'react'
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

  handleClick = prop => {
    console.log(prop)
    this.setState({ id: prop.id })
    this.setState({ name: prop.name })
    console.log(this.state)
  }

  render () {
    const domains = this.state.domains
    console.log('render')
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
                        <a href='ManageUsersPage'>Manage Users</a>
                      </li>
                      <li>
                        <a href='ManageRolesPage'>Manage Roles</a>
                      </li>
                      <li>
                        <a href='ManageLanguagesPage'>Manage Languages</a>
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
                                <ButtonGroup className='buttonManagePages'>
                                  <Link to='/editdomain'>
                                    <Button
                                      onClick={() => api.editDomain(prop.id)}
                                      bsSize='sm'
                                      bsStyle='primary'
                                      fill
                                    >
                                      <i class='far fa-edit' /> Edit
                                    </Button>
                                  </Link>
                                  <Button
                                    onClick={() => this.deleteDomain(prop.id)}
                                    bsSize='sm'
                                    bsStyle='info'
                                    fill
                                  >
                                    <i class='fas fa-trash-alt' /> Delete
                                  </Button>
                                </ButtonGroup>
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
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ManageDomains
