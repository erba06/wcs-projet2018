import React from 'react'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import BigCalendar from 'react-big-calendar'
import 'fullcalendar'
// import 'fullcalendar-scheduler'
import moment from 'moment'

import $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable'

require('jquery')
require('jquery-ui-bundle')
require('jquery-ui/ui/widgets/sortable')
require('jquery-ui/ui/disable-selection')

moment.locale('en-gb')

// const localizer = BigCalendar.momentLocalizer(moment)

class WeekCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      translationRequests: props
    }
  }
  render () {
    const translationRequests = this.props.translationRequests
    console.log(translationRequests)
    console.log(this.props)

    return (
      <div>
        <External />
        <Calendar
          /* Pass translation request from week calendar to calendar */
          translationRequests={translationRequests}
        />
      </div>
    )
  }
}

/*
 * A simple React component
 */
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
  }
  componentDidMount () {
    this.updateEvents(this.props.translationRequests)
  }
  componentDidUpdate () {
    this.updateEvents(this.props.translationRequests)
  }
  updateEvents (eventsList) {
    let array = []
    array.push(eventsList)
    console.log(array)

    let event = array.map(event => ({
      title: event.id,
      start: event.requestDate,
      end: event.deadline
    }))
    console.log(event)

    $('#calendar').fullCalendar('destroy')
    $('#calendar').fullCalendar({
      dragOpacity: 0.4,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
        right: 'agendaWeek, agendaDay'
      },
      droppable: true,
      defaultView: 'agendaWeek',
      businessHours: true,
      weekends: false,
      allDay: true,
      defaultDate: '2018-03-12',
      editable: true,
      eventLimit: true,
      selectable: true,
      selectHelper: true,
      resizable: true,
      minTime: '09:00:00',
      maxTime: '19:00:00',
      height: 700,
      contentHeight: 500,
      columnFormat: 'ddd',
      events: event
    })
  }
  render () {
    return <div id='calendar' />
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     translationRequests: props
  //   }
  // }
  // render () {
  //   const translationRequests = this.props.translationRequests
  //   console.log(translationRequests)
  //   console.log(this.props)
  //   console.log(moment(this.props.translationRequests.requestDate))
  //   const start = moment(this.props.translationRequests.requestDate)

  //   return <div id='calendar' />
  // }
  // componentDidMount () {
  //   $('#calendar').fullCalendar({
  //     events: this.props.translationRequests,
  //     dragOpacity: 0.4,
  //     header: {
  //       left: 'prev,next today',
  //       center: 'title',
  //       //        right: 'month,agendaWeek,agendaDay',
  //       right: 'agendaWeek, agendaDay'
  //     },
  //     droppable: true,
  //     defaultView: 'agendaWeek',
  //     businessHours: true,
  //     weekends: false,
  //     allDay: true,
  //     defaultDate: '2018-03-12',
  //     editable: true,
  //     eventLimit: true,
  //     selectable: true,
  //     selectHelper: true,
  //     resizable: true,
  //     minTime: '09:00:00',
  //     maxTime: '19:00:00',
  //     height: 700,
  //     contentHeight: 500,

  //     select: function (start, end) {
  //       end = $.fullCalendar.moment(start)
  //       end.add(1, 'hours')
  //       $('#calendar').fullCalendar(
  //         'renderEvent',
  //         {
  //           start: start,
  //           end: end,
  //           allDay: false,
  //           editable: true
  //         },
  //         true // stick the event
  //       )
  //       $('#calendar').fullCalendar('unselect')
  //     },
  //     schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

  //     events: [
  //       {
  //         title: 'All Day Event',
  //         start: '2018-03-01',
  //         allDay: true,
  //         end: moment().add(1, 'hour'),
  //         stick: true,
  //         editable: true
  //       },
  //       {
  //         title: 'TEESSST',
  //         start: '2018-03-18',
  //         allDay: true,
  //         end: moment().add(1, 'hour'),
  //         // end: this.props.translationRequests.deadline,
  //         editable: true,
  //         stick: true
  //       },
  //       {
  //         title: 'Long Event',
  //         start: '2018-03-07',
  //         end: '2018-03-10',
  //         allDay: true,
  //         editable: true
  //       },
  //       {
  //         id: 999,
  //         title: 'Repeating Event',
  //         start: '2018-03-09T16:00:00',
  //         editable: true
  //       },
  //       {
  //         id: 999,
  //         title: 'Repeating Event',
  //         start: '2018-03-16T16:00:00',
  //         editable: true
  //       },
  //       {
  //         title: 'Conference',
  //         start: '2018-03-11',
  //         end: '2018-03-13',
  //         editable: true,
  //         stick: true
  //       },
  //       {
  //         title: 'Meeting',
  //         start: '2018-03-12T10:30:00',
  //         end: '2018-03-12T12:30:00',
  //         editable: true
  //       },
  //       {
  //         title: 'Lunch',
  //         start: '2018-03-12T12:00:00'
  //       },
  //       {
  //         title: 'Meeting',
  //         start: '2018-03-12T14:30:00'
  //       },
  //       {
  //         title: 'Happy Hour',
  //         start: '2018-03-12T17:30:00'
  //       },
  //       {
  //         title: 'Dinner',
  //         start: '2018-03-12T20:00:00'
  //       },
  //       {
  //         title: 'Birthday Party',
  //         msg: 'I am OK',
  //         start: '2018-03-14 14:00:00',
  //         end: '2018-03-14 15:00:00',
  //         editable: true,
  //         allDay: false
  //       },
  //       {
  //         title: 'Click for Google',
  //         url: 'http://google.com/',
  //         start: '2018-03-28'
  //       }
  //     ],
  //     // this allows things to be dropped onto the calendar
  //     drop: function (date, jsEvent, ui, resourceId) {
  //       // is the "remove after drop" checkbox checked?
  //       if ($('#drop-remove').is(':checked')) {
  //         // if so, remove the element from the "Draggable Events" list
  //         $(this).remove()
  //       }
  //     },
  //     eventDrop: function (event, delta, revertFunc) {
  //       alert(event.title + ' was dropped on ' + event.start.format())

  //       if (!window.confirm('Are you sure about this change?')) {
  //         revertFunc()
  //       }
  //     }
  //   })
  // }
}

class External extends React.Component {
  render () {
    return (
      <div id='external-events'>
        <h4>Draggable Events</h4>
        <div className='fc-event'>My Translation Request 1</div>
        <div className='fc-event'>My Translation Request 2</div>
        <div className='fc-event'>My Translation Request 3</div>
        <div className='fc-event'>My Translation Request 4</div>
        <div className='fc-event'>My Translation Request 5</div>
        <p>
          <input type='checkbox' id='drop-remove' />
          <label for='drop-remove'>remove after drop</label>
        </p>
      </div>
    )
  }
  componentDidMount () {
    $('#external-events .fc-event').each(function () {
      // store data so the calendar knows to render an event upon drop
      $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
      })

      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true, // will cause the event to go back to its
        revertDuration: 0 //  original position after the drag
      })
    })
  }
}

export default WeekCalendar
