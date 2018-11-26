import React, { Component } from 'react'
import { Grid, Row, Col, Table, ButtonGroup } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Alert from 'react-s-alert'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import apiService from '../../api/apiService'
import api from '../../api'


class ManageLanguages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      languages: []
    }
  }

  componentDidMount () {
    console.log(this.state)
    apiService
      .getApiEndpoint('GetLanguages')
      .then(this.updateState)
      .catch(console.log)
    console.log(this.state)
  }

  updateState = languages => {
    this.setState({ languages: languages.data })
  }

  deleteLanguages = prop => {
    apiService
      .getApiEndpoint('DeleteLanguage', null, { id: prop.id })
      .then(res => console.log(res))
  }

  render () {
    const languages = this.state.languages
    console.log('render')
    console.log(languages)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Manage Languages'
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
                        <a href='ManageDomainsPage'>Manage Domains</a>
                      </li>
                    </ul>

                    <Table striped hover>
                      <div id='tableGoesHere' className='col-md-6' />
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Language Name</th>
                          <th>Language Code</th>
                          <th>Neutral language</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {languages.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>
                                <ol>{prop.name}</ol>
                              </td>
                              <td>
                                <ol>{prop.code}</ol>
                              </td>
                              <td>
                                {prop.isNeutral ? <ol>Yes</ol> : <ol>No</ol>}
                              </td>
                              <td>
                                <ButtonGroup className='buttonManagePages'>
                                  <Link to='/editlanguage'>
                                    <Button 
                                      onClick={() => api.editLanguage(prop.id)}  
                                      bsSize='sm' 
                                      bsStyle='primary' 
                                      fill
                                      >
                                      <i className='far fa-edit' /> Edit
                                    </Button>
                                  </Link>
                                  <Button
                                    onClick={() => this.deleteLanguages(prop)}
                                    bsSize='sm'
                                    bsStyle='info'
                                    fill
                                  >
                                    <i className='fas fa-trash-alt' /> Delete
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
              <Link to='/addlanguage'>
                <Button bsStyle='info' pullleft="true" fill type='submit'>
                  Add language
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default ManageLanguages
