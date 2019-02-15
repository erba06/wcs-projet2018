import React from 'react'
import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import { Link } from 'react-router-dom'
import Card from 'components/Card/Card.jsx'
import 'assets/css/admin.css'

const MainPlanning = props => {
  return (
    <div className='main planning'>
      <Grid fluid>
        <Row>
          <Col md={12}>

            <Card
              title='Planning'
              category='Your internal translation requests marketplace'
              ctTableFullWidth
              ctTableResponsive
              content={
                <ButtonToolbar className='MainPlanningButtons'>
                  <div className='buttonLine'>
                    <Link to='/weeklyplanning'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Weekly Planning
                      </Button>
                    </Link>
                    <Link to='/monthlyplanning'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Monthly Planning
                      </Button>
                    </Link>
                    <Link to='/recurringtasks'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Recurring tasks
                      </Button>
                    </Link>
                  </div>
                  <div className='buttonLine'>
                    <Link to='/absences'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Absences
                      </Button>
                    </Link>
                    <Link to='/taskfinder'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Task finder
                      </Button>
                    </Link>
                    <Link to='/workinghours'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Working hours
                      </Button>
                    </Link>
                  </div>
              {/*    <div className='buttonLine'>
                    <Link to='/managelanguages'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Manage languages
                      </Button>
                    </Link>
                    <Link to='/managedomains'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Manage domains
                      </Button>
                    </Link>
                    <Link to='/managedomains'>
                      <Button bsSize='large' bsStyle='info' fill>
                        Manage domains
                      </Button>
                    </Link>
              </div> */}
                </ButtonToolbar>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default MainPlanning
