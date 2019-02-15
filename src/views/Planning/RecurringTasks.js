import React from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import 'assets/css/admin.css'
import api from '../../api'

const RecurringTasks = props => {
  return (
    <div className='recurring-tasks'>
      <Grid fluid>
        <Card
          title='Recurring Tasks'
          category='Your internal translation requests marketplace'
          ctTableFullWidth
          ctTableResponsive
          content={
            <div className='container-recurring-tasks'>
              <h1>HELLO</h1>
            </div>
          }
        />
      </Grid>
    </div>
  )
}

export default RecurringTasks
