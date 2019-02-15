import React from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import 'assets/css/admin.css'
import api from '../../api'

const TaskFinder = props => {
  return (
    <div className='task-finder'>
      <Grid fluid>
        <Card
          title='Task finder'
          category='Your internal translation requests marketplace'
          ctTableFullWidth
          ctTableResponsive
          content={
            <div className='container-task-finder'>
              <h1>Task Finder</h1>
            </div>
          }
        />
      </Grid>
    </div>
  )
}

export default TaskFinder
