import React from 'react'
import { Panel } from 'react-bootstrap'
import '../../../src/assets/css/admin.css'
import 'react-datepicker/dist/react-datepicker.css'
import MonthYearPicker from '../MonthYearPicker/MonthYearPicker'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class MonthView extends React.Component {
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
      <div className='month-view'>
        <Panel className="month-view-panel" bsStyle='primary'>
          <Panel.Heading id="mypanel">
            <Panel.Title componentClass='h3'>
              <i className='fas fa-calendar-week' />
              Translator month view
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className="month-view-body">
            Select a month and year :
            <MonthYearPicker />
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
export default MonthView
