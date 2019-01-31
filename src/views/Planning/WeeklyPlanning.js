import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import 'assets/css/admin.css'
import SelectTranslators from 'components/Planning/SelectTranslators'
import WeekView from 'components/Planning/WeekView'
import Filter from '../../components/Planning/Filter'
import WeekTasks from 'components/Planning/WeekTasks'
import WeekCalendar from 'components/Planning/WeekCalendar'
import api from '../../api'
import apiService from '../../api/apiService'

class WeeklyPlanning extends Component {
  constructor (props) {
    super(props)
    this.state = {
      roles: [],
      languages: [],
      domains: [],
      accounts: [],
      selectedTargetLanguage: '',
      selectedSourceLanguage: '',
      selectedDomain: ''
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
  filterAccountDomain = selectedDomain => {
    let accounts = this.state.accounts
    let filteredAccounts = accounts.filter(
      account => api.displayDomains(account) == selectedDomain
    )
    console.log(filteredAccounts)
    this.setState({ filteredAccounts: filteredAccounts })
    console.log(this.state)
  }

  filterAccountSource = selectedSourceLanguage => {
    let accounts = this.state.accounts
    let filteredAccountsBySource = accounts.filter(
      account => api.checkSourceLanguages(account) == selectedSourceLanguage
    )
    this.setState({ filteredAccounts: filteredAccountsBySource })

    console.log(filteredAccountsBySource)
    console.log(this.state)
  }

  filterAccountTarget = selectedTargetLanguage => {
    let accounts = this.state.accounts
    let filteredAccountsByTarget = accounts.filter(
      account =>
        api.checkTargetLanguages(account) !== null &&
        api.checkTargetLanguages(account).includes(selectedTargetLanguage)
    )

    this.setState({ filteredAccounts: filteredAccountsByTarget })

    console.log(filteredAccountsByTarget)
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
    const roles = this.state.roles
    const accounts = this.state.accounts
    const domains = this.state.domains
    const languages = this.state.languages
    const selectedDomain = this.state.selectedDomain
    console.log(this.state)

    return (
      <div className='weekly-planning'>
        <Grid fluid>
          <Card
            title='Weekly Planning'
            category='Your internal translation requests marketplace'
            ctTableFullWidth
            ctTableResponsive
            content={
              <div>
                <div className='container-week-view'>
                  <SelectTranslators
                    accounts={this.state.accounts}
                    filteredAccounts={this.state.filteredAccounts}
                    selectedTargetLanguage={this.state.selectedTargetLanguage}
                    selectedSourceLanguage={this.state.selectedSourceLanguage}
                    selectedDomain={this.state.selectedDomain}
                  />
                  <WeekView passFilteredDomain={this.props.filteredDomain} />
                </div>
                <div className='container-week-view-bottom'>
                  <Filter
                    passSelectedTargetLanguage={this.updateTargetState}
                    passSelectedSourceLanguage={this.updateSourceState}
                    passSelectedDomain={this.updateDomainState}
                    domains={this.state.domains}
                    languages={this.state.languages}
                  />
                  <WeekCalendar />
                </div>
              </div>
            }
          />
        </Grid>
      </div>
    )
  }
}

export default WeeklyPlanning
