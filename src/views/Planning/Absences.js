import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import SelectTranslators from 'components/Planning/SelectTranslators'
import Button from 'components/CustomButton/CustomButton.jsx'
import apiService from '../../api/apiService'
import { Link, withRouter } from 'react-router-dom'
import 'assets/css/admin.css'

class Absences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      roles: [],
      languages: [],
      domains: [],
      accounts: [],
      selectedTargetLanguage: 'select',
      selectedSourceLanguage: 'select',
      selectedDomain: 'select',
      filteredAccounts: 'select'
    }
    console.log(this.state)
  }
  updateTargetState = props => {
    this.setState({ selectedTargetLanguage: props })
    this.filterAccountTarget(props)
  }
  updateSourceState = props => {
    this.setState({ selectedSourceLanguage: props })
    this.filterAccountSource(props)
  }
  updateDomainState = props => {
    this.setState({ selectedDomain: props })
    this.filterAccountDomain(props)
  }
  syncDatas = () => {
    apiService.getApiEndpoint('GetDomains').then(domains => {
      this.setState({ domains: domains.data })
    })
    apiService.getApiEndpoint('GetRoles').then(roles => {
      this.setState({ roles: roles.data })
    })
    apiService.getApiEndpoint('GetAccounts').then(accounts => {
      this.setState({ accounts: accounts.data.items })
    })
    apiService.getApiEndpoint('GetLanguages').then(languages => {
      this.setState({ languages: languages.data })
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
            title='Absences'
            category='Your internal translation requests marketplace'
            ctTableFullWidth
            ctTableResponsive
            content={
              <div className="global-container">
                <ul className="breadcrumb">
                  <li>
                    <Link to="/weeklyplanning">
                      <a href="WeeklyPlanningPage">Weekly Planning</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/monthlyplanning">
                      <a href="MonthlyPlanningPage">Monthly Planning</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/recurringtasks">
                      <a href="RecurringTasksPage">Recurring tasks</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/absences">
                      <a href="Absence">Absences</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/taskfinder">
                      <a href="TaskFinderPage">Task finder</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/workinghours">
                      <a href="WorkingHours">Working hours</a>
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
                    <i class='fas fa-sun' />
                    Manage absences
                  </div>

                  <div className='absence-list'>
                  <div className='start-absence'>Start</div>
                    <div className='end-absence'>End</div>
                    <div className='category-absence'>Category</div>
                    <div className='reason-absence'>Reason</div>
                    <Link to='/addabsence'>
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

export default withRouter(Absences)
