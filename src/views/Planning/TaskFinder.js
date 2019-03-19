import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import SelectTranslators from 'components/Planning/SelectTranslators'
import Button from 'components/CustomButton/CustomButton.jsx'
import { Link } from 'react-router-dom'
import 'assets/css/admin.css'
import api from '../../api'
import apiService from '../../api/apiService'

class TaskFinder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accounts: []
    }
    console.log(this.state)
  }

  syncDatas = () => {
    apiService.getApiEndpoint('GetAccounts').then(accounts => {
      this.setState({ accounts: accounts.data.items })
    })
  }
  componentDidMount () {
    this.syncDatas()
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Card
            title='Task finder'
            category='Your internal translation requests marketplace'
            ctTableFullWidth
            ctTableResponsive
            content={
              <div className='global-container'>
                <ul className='breadcrumb'>
                  <li>
                    <Link to='/weeklyplanning'>
                      <a href='WeeklyPlanningPage'>Weekly Planning</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/monthlyplanning'>
                      <a href='MonthlyPlanningPage'>Monthly Planning</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/recurringtasks'>
                      <a href='RecurringTasksPage'>Recurring tasks</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/absences'>
                      <a href='Absence'>Absences</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/taskfinder'>
                      <a href='TaskFinderPage'>Task finder</a>
                    </Link>
                  </li>
                  <li>
                    <Link to='/workinghours'>
                      <a href='WorkingHours'>Working hours</a>
                    </Link>
                  </li>
                </ul>
                <div className='container-week-view-global'>
                  <div className='container-week-view-top'>
                    <SelectTranslators
                      accounts={this.state.accounts}
                      filteredAccounts={this.state.filteredAccounts}
                      selectedTargetLanguage={this.state.selectedTargetLanguage}
                      selectedSourceLanguage={this.state.selectedSourceLanguage}
                      selectedDomain={this.state.selectedDomain}
                    />
                  </div>
                  <div className='container-working-hours'>
                    <div className='working-hours'>
                      <i class='fas fa-search' />
                      Find a task
                    </div>

                    <div className='absence-list'>
                      <div className='start-absence'>Start</div>
                      <div className='end-absence'>End</div>
                      <div className='category-absence'>Category</div>
                      <div className='reason-absence'>Reason</div>
                      <Link to='/taskfinder'>
                        <Button bsStyle='primary' fill>
                          Add
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Grid>
      </div>
    )
  }
}

export default TaskFinder
