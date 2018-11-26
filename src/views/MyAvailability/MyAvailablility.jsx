import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Jumbotron
} from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import { Card } from 'components/Card/Card.jsx'
import DateRangePicker from 'react-bootstrap-daterangepicker'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'

class MyAvailability extends Component {
  handleEvent (event, picker) {
    console.log(picker.startDate)
  }
  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='My Availability'
                category='Edit my availability'
                content={
                  <form>
                    <Jumbotron>
                      <h3>My Availability!</h3>
                      <p>
                          Indicate when you are not available. Click on the button to open the calendar.
                      </p>
                      
                        <DateRangePicker onEvent={this.handleEvent} startDate='1/1/2014' endDate='3/1/2014'>
                          <Button bsStyle='info' fill>Select Dates</Button>
                        </DateRangePicker>
                      
                    </Jumbotron>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default MyAvailability
