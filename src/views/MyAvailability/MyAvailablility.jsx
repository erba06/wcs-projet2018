import React, { Component } from 'react'
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import { Card } from 'components/Card/Card.jsx'
import DateRangePicker from 'react-bootstrap-daterangepicker'
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css'
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'
import apiService from '../../api/apiService'
import api from '../../api'

class MyAvailability extends Component {
  constructor (props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)

    this.state = {
      from: '',
      to: '',
      userAvailability: [],
      unavailable: '',
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment()
            .subtract(1, 'month')
            .startOf('month'),
          moment()
            .subtract(1, 'month')
            .endOf('month')
        ]
      }
    }
    console.log(this.state)
  }

  handleApply (event, picker) {
    console.log(picker)
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    })
    api.addUserAvailability(picker)
  }

  syncDatas = () => {
    apiService.getApiEndpoint('GetUserAvailability').then(userAvailability => {
      this.setState({ userAvailability: userAvailability.data })
    })
  }
  componentDidMount () {
    this.syncDatas()
    console.log(this.state)
  }
  render () {
    let start = this.state.startDate.format('DD-MM-YYYY')
    let end = this.state.endDate.format('DD-MM-YYYY')
    let userAvailability = this.state.userAvailability
    console.log(this.state)
    let toDate = moment(this.state.userAvailability.to).format('DD-MM-YYYY')
    let endDate = moment(this.state.userAvailability.endDate).format('DD-MM-YYYY')

    let label = start + ' - ' + end
    if (start === end) {
      label = start
    }

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
                        Indicate when you are not available. Click on the button
                        to open the calendar.
                      </p>

                      <DateRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onApply={this.handleApply}
                      >
                        <div className='input-group'>
                          <input
                            type='text'
                            className='form-control'
                            value={label}
                          />
                          <span className='input-group-btn'>
                            <Button
                              className='default date-range-toggle'
                              bsStyle='info'
                            >
                              <i className='fa fa-calendar' /> Select Dates
                            </Button>
                          </span>
                        </div>
                      </DateRangePicker>

                      <h4>I am not available at the following dates:</h4>
                      <div className='input-group'>
                        From{' '}<span>{endDate} </span>{' '}
                        to <span>{toDate}</span>
                      </div>
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
