import React from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import 'assets/css/admin.css'
import api from '../../api'

const Absences = props => {
  return (
    <div className='absences'>
      <Grid fluid>
        <Card
          title='Absences'
          category='Your internal translation requests marketplace'
          ctTableFullWidth
          ctTableResponsive
          content={
            <div className='container-absences'>
              <h1>ABSENCES</h1>
            </div>
          }
        />
      </Grid>
    </div>
  )
}

export default Absences
