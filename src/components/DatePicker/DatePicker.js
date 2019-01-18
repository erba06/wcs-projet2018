import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

class DatePickerComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }
  render () {
    return (
      <DatePicker
        selected={moment(this.state.startDate)}
        onChange={this.handleChange}
      />
    )
  }
}

export default DatePickerComponent
