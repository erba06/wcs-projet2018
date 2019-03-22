import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Card from 'components/Card/Card.jsx'
import { thArray } from 'variables/Variables.jsx'
import { Link } from 'react-router-dom'
import apiService from '../../api/apiService'
const tdArray = require('mocks/translationform.json')

class TranslationRequests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      translationRequests: []
    }
    console.log(props)
  }

  syncDatas = () => {
    apiService
      .getApiEndpoint('GetTranslationRequest', null, { id: 2 })
      .then(translationRequests => {
        this.setState({ translationRequests: translationRequests.data })
      })
    /* returns empty array ? */
    // apiService.getApiEndpoint('GetTranslationRequests')
    //   .then(requests => {
    //     this.setState({ translationRequest: requests.data })
    //   })
  }
  componentDidMount () {
    this.syncDatas()
  }
  render () {
    let array = []
    const translationRequests = array.push(this.state.translationRequests)
    console.log(array)

    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Translation Requests'
                category='Your internal translation requests marketplace'
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {array.map((prop, key) => {
                        console.log(prop.linguist)

                        {
                          if (
                            prop &&
                            prop.linguist &&
                            prop.linguist.firstName &&
                            prop.linguist.lastName &&
                            prop.jobType &&
                            prop.jobType.jobTypeName &&
                            prop.source &&
                            prop.target &&
                            prop.source.languageName &&
                            prop.target.languageName
                          ) {
                            return (
                              <tr key={key}>
                                <td>{prop.id}</td>
                                <td>
                                  {prop.source.languageName} to{' '}
                                  {prop.target.languageName}
                                </td>
                                <td>
                                  {prop.linguist.firstName}{' '}
                                  {prop.linguist.lastName}
                                </td>
                                <td>{prop.deadline}</td>
                                <td>{prop.jobType.jobTypeName}</td>
                                <td>
                                  {prop.clientName}/{prop.orderNumber}
                                </td>
                                <td>{prop.wordCount}</td>
                                <td>{prop.wwc}</td>
                                <td>{prop.id}</td>
                              </tr>
                            )
                          }
                        }
                      })}
                    </tbody>
                  </Table>
                }
              />
              <Link to='/translationrequestsform'>
                <Button bsStyle='info' pullRight fill type='submit'>
                  New request
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TranslationRequests
