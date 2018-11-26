import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import Card from 'components/Card/Card.jsx'
import { thArray } from 'variables/Variables.jsx'
import { Link } from 'react-router-dom'
const tdArray = require('mocks/translationform.json')

class TranslationRequests extends Component {
  render () {
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
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                }
              />
              <Link to='/translationrequestsform'><Button bsStyle='info' pullRight fill type='submit'>New request</Button></Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TranslationRequests
