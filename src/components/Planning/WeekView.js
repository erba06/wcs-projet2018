import React from 'react'
import { Panel } from 'react-bootstrap'
import '../../../src/assets/css/admin.css'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerComponent from '../DatePicker/DatePicker';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class WeekView extends React.Component {
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
      <div className='week-view'>
        <Panel bsStyle='primary'>
          <Panel.Heading id="mypanel">
            <Panel.Title componentClass='h3'>
              <i className='fas fa-calendar-week' />
              Translator week view
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className='weekview'>
            Select a day in a week :
         {/*}   <DatePickerComponent />*/}
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
export default WeekView
