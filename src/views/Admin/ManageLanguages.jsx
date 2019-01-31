import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    // this.editLanguage = this.editLanguage.bind(this)
  }

  componentDidMount () {
    apiService
      .getApiEndpoint('GetLanguages')
      .then(this.updateState)
      .catch(console.log)
    console.log(this.state)
  }

  updateState = languages => {
    this.setState({ languages: languages.data })
  }

  // editLanguage() {
  // const action = { type: 'EDIT_LANGUAGE', value: this.state.languages }
  // this.props.dispatch(action)
  // console.log(this.prop)
  // }

  render () {
    const languages = this.state.languages
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
                             {/*}   <ButtonGroup className='buttonManagePages'> */}
                                  <Link to='/editlanguage/:id'>
                                    <Button
                                      onClick={() => api.getLanguage(prop.id)}
                                      bsSize='default'
                                      bsStyle='primary'
                                      fill
                                    >
                                      <i className='far fa-edit' /> Edit
                                    </Button>
                                  </Link>
                                  <Button
                                    onClick={() => {
                                      console.log(prop)
                                      api.deleteLanguage(prop)
                                    }}
                                    bsSize='default'
                                    bsStyle='info'
                                    fill
                                  >
                                    <i className='fas fa-trash-alt' /> Delete
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
              <Link to='/addlanguage'>
                <Button bsStyle='info' pullleft='true' fill type='submit'>
                  Add language
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
{
  /* const mapStateToProps = state => {
  return {
    state
    // languages: state.languages
  }
}

export default connect(mapStateToProps)(ManageLanguages)
*/
}
export default ManageLanguages
