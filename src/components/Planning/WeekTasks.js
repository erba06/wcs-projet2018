import React, { Component } from 'react'
import '../../../src/assets/css/admin.css'

class TaskAM extends Component {
  render () {
    return (
      <div className='week-task-am'>
        <a
          className='accordion-icon-circle collapsed'
          data-toggle='collapse'
          data-target='#tasks-AM'
        >
          {' '}
          <span className='accordion-icon' />
        </a>
        <span className='label label-success label-as-badge'>0 orders(s)</span>
        <span className='label label-danger label-as-badge'>0%</span>

        <div className='date-am'>Mercredi 9 décembre 2018 AM (3h)</div>
        <div id='tasks-AM' className='collapse'>
          <ol className='list-group'>
            <li className='list-group-item'>Additional task infos AM</li>
          </ol>
        </div>
      </div>
    )
  }
}

class TaskPM extends Component {
  render () {
    return (
      <div className='week-task-pm'>
        <a
          className='accordion-icon-circle collapsed'
          data-toggle='collapse'
          data-target='#tasks-PM'
        >
          {' '}
          <span className='accordion-icon' />
        </a>
        <span className='label label-success label-as-badge'>0 orders(s)</span>
        <span className='label label-danger label-as-badge'>0%</span>
        <div className='date-pm'>Mercredi 9 décembre 2018 PM (4h)</div>
        <div id='tasks-PM' className='collapse'>
          <ol className='list-group'>
            <li className='list-group-item'>Additional task infos PM</li>
          </ol>
        </div>
      </div>
    )
  }
}
class WeekTasks extends Component {
  render () {
    let taskAM = []
    let taskPM = []
    for (let i = 0; i < 5; i++) {
      taskAM.push(<TaskAM id={i} key={i} />)
      taskPM.push(<TaskPM id={i} key={i} />)
    }
    return (
      <div className='week-tasks'>
        <div className='date-am-container'>{taskAM}</div>
        <div className='date-pm-container'>{taskPM}</div>
      </div>
    )
  }
}

export default WeekTasks
