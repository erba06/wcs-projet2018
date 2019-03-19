import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import 'assets/css/admin.css'
import SelectTranslatorsMonthly from 'components/Planning/SelectTranslatorsMonthly'
import MonthView from 'components/Planning/MonthView'
import Filter from '../../components/Planning/Filter'
import WeekTasks from 'components/Planning/WeekTasks'
import apiService from '../../api/apiService'
import api from '../../api'
declare var $: any

class MonthlyPlanning extends Component {
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

  filterAccountDomain = selectedDomain => {
    let accounts = this.state.accounts
    if (
      selectedDomain !== 'select' &&
      ((this.state.selectedSourceLanguage == 'select') &&
        (this.state.selectedTargetLanguage == 'select' ))
    ) {
      console.log('SELECTEDOM' + selectedDomain)
      let filteredAccountsByDomains = accounts.filter(account => {
        return (
          api.displayDomains(account) !== null &&
          api.displayDomains(account)
            .includes(selectedDomain)
        )
      })
      this.setState({ filteredAccounts: filteredAccountsByDomains })
      console.log('DOMAIN: ' + filteredAccountsByDomains)
    }

    if (
      selectedDomain == 'select' &&
      this.state.selectedSourceLanguage == 'select' &&
      this.state.selectedTargetLanguage == 'select'
    ) {
      this.setState({ filteredAccounts: this.state.accounts })
    }

    // if (
    //   selectedDomain == 'select' &&
    //   this.state.selectedSourceLanguage !== 'select' &&
    //   this.state.selectedTargetLanguage == 'select'
    // ) {
    //   let filteredAccountsBySource = accounts.filter(account => {
    //     return (
    //       api.checkSourceLanguages(account) !== null &&
    //       api
    //         .checkSourceLanguages(account)
    //         .includes(this.state.selectedSourceLanguage)
    //     )
    //   })
    //   this.setState({ filteredAccounts: filteredAccountsBySource })
    // }
    if (
      selectedDomain !== 'select' &&
      this.state.selectedSourceLanguage !== 'select' &&
      this.state.selectedTargetLanguage == 'select'
    ) {
      let filteredAccountsByDomainsAndSource = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(this.state.selectedSourceLanguage)
          )
        })
        .filter(account => {
          return api.displayDomains(account) == selectedDomain
        })
      this.setState({ filteredAccounts: filteredAccountsByDomainsAndSource })
    }
    if (
      selectedDomain !== 'select' &&
      this.state.selectedSourceLanguage !== 'select' &&
      this.state.selectedTargetLanguage !== 'select'
    ) {
      let filteredAccountsByDomainsAndSourceAndTargets = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(this.state.selectedSourceLanguage)
          )
        })
        .filter(account => {
          return (
            api.checkTargetLanguages(account) !== null &&
            api
              .checkTargetLanguages(account)
              .includes(this.state.selectedTargetLanguage)
          )
        })
      this.setState({
        filteredAccounts: filteredAccountsByDomainsAndSourceAndTargets
      })
    }
    if (
      selectedDomain !== 'select' &&
      this.state.selectedSourceLanguage !== 'select' &&
      this.state.selectedTargetLanguage !== 'select'
    ) {
      let filteredAccountsByDomainsAndSourceAndTargets = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(this.state.selectedSourceLanguage)
          )
        })
        .filter(account => {
          return (
            api.checkTargetLanguages(account) !== null &&
            api
              .checkTargetLanguages(account)
              .includes(this.state.selectedTargetLanguage)
          )
        })
      this.setState({
        filteredAccounts: filteredAccountsByDomainsAndSourceAndTargets
      })
    }
  }

  filterAccountSource = selectedSourceLanguage => {
    let accounts = this.state.accounts
    if (
      selectedSourceLanguage !== 'select' &&
      this.state.selectedDomain == 'select' &&
      this.state.selectedTargetLanguage == 'select'
    ) {
      let filteredAccountsBySource = accounts.filter(account => {
        return (
          api.checkSourceLanguages(account) !== null &&
          api.checkSourceLanguages(account)
            .includes(selectedSourceLanguage)
        )
      })
      console.log('FILTRES: ' + filteredAccountsBySource)
      this.setState({ filteredAccounts: filteredAccountsBySource })
    }
    if (
      (selectedSourceLanguage == 'select') &&
      (this.state.selectedSourceLanguage == 'select') &&
      (this.state.selectedTargetLanguage == 'select')
    ) {
      this.setState({ filteredAccounts: this.state.accounts })
    }
    // if (
    //   selectedSourceLanguage !== 'select' &&
    //   this.state.filteredAccounts !== 'select' &&
    //   this.state.selectedTargetLanguage == 'select'
    // ) {
    //   let filteredAccountsBySource = this.state.filteredAccounts.filter(
    //     account => {
    //       return (
    //         api.checkSourceLanguages(account) !== null &&
    //         api.checkSourceLanguages(account).includes(selectedSourceLanguage)
    //       )
    //     }
    //   )
    //   this.setState({ filteredAccounts: filteredAccountsBySource })
    // }
    if (
      selectedSourceLanguage == 'select' &&
      this.state.selectedDomain !== 'select' &&
      this.state.selectedTargetLanguage == 'select'
    ) {
      let filteredAccountsByDomains = accounts.filter(account => {
        return (
          api.displayDomains(account) !== null &&
          api.displayDomains(account)
          .includes(this.state.selectedDomain)
        )
      })
      this.setState({ filteredAccounts: filteredAccountsByDomains })
    }
    if (
      selectedSourceLanguage !== 'select' &&
      this.state.selectedDomain !== 'select' &&
      this.state.selectedDomain !== 'select'
    ) {
      let filteredAccountsBySourceAndDomain = this.state.accounts
        .filter(account => {
          return api.displayDomains(account) == this.state.selectedDomain
        })
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api.checkSourceLanguages(account).includes(selectedSourceLanguage)
          )
        })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
    }
    if (
      selectedSourceLanguage !== 'select' &&
      this.state.selectedDomain !== 'select' &&
      this.state.selectedTarget == 'select'
    ) {
      let filteredAccountsBySourceAndDomain = this.state.accounts
        .filter(account => {
          return api.displayDomains(account) == this.state.selectedDomain
        })
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api.checkSourceLanguages(account).includes(selectedSourceLanguage)
          )
        })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
    }
    if (
      this.selectedTargetLanguage !== 'select' &&
      this.state.selectedDomain == 'select' &&
      selectedSourceLanguage !== 'select'
    ) {
      let filteredAccountsBySourceAndTarget = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(selectedSourceLanguage)
          )
        })
        .filter(account => {
          return (
            api.checkTargetLanguages(account) !== null &&
            api.checkTargetLanguages(account).includes(this.state.selectedTargetLanguage)
          )
        })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndTarget })
    }
  }

  filterAccountTarget = selectedTargetLanguage => {
    let accounts = this.state.accounts
    if (
      selectedTargetLanguage !== 'select' &&
      (this.state.selectedDomain == 'select') &&
      (this.state.selectedSourceLanguage == 'select')
    ) {
      let filteredAccountsByTarget = accounts.filter(account => {
        return (
          api.checkTargetLanguages(account) !== null &&
          api.checkTargetLanguages(account).includes(selectedTargetLanguage)
        )
      })
      this.setState({ filteredAccounts: filteredAccountsByTarget })
      console.log(filteredAccountsByTarget)
    }
    if (
      selectedTargetLanguage !== 'select' &&
      this.state.filteredAccounts !== 'select' &&
      this.state.filteredAccounts !== undefined
    ) {
      let filteredAccountsByTarget = this.state.filteredAccounts.filter(
        account => {
          return (
            api.checkTargetLanguages(account) !== null &&
            api.checkTargetLanguages(account).includes(selectedTargetLanguage)
          )
        }
      )
      this.setState({ filteredAccounts: filteredAccountsByTarget })
      console.log(filteredAccountsByTarget)
    }

    if (
      selectedTargetLanguage == 'select' &&
      this.state.selectedDomain == 'select' &&
      this.state.selectedSourceLanguage == 'select'
    ) {
      this.setState({ filteredAccounts: accounts })
    }
    if (
      selectedTargetLanguage == 'select' &&
      this.state.selectedDomain !== 'select' &&
      this.state.selectedSourceLanguage !== 'select'
    ) {
      let filteredAccountsBySourceAndDomain = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(this.state.selectedSourceLanguage)
          )
        })
        .filter(account => {
          return api.displayDomains(account) == this.state.selectedDomain
        })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
      console.log('RESULTATS: ' + filteredAccountsBySourceAndDomain)
    }
    if (
      selectedTargetLanguage == 'select' &&
      this.state.selectedDomain == 'select' &&
      this.state.selectedSourceLanguage !== 'select'
    ) {
      let filteredAccountsBySourceAndDomain = accounts.filter(account => {
        return (
          api.checkSourceLanguages(account) !== null &&
          api
            .checkSourceLanguages(account)
            .includes(this.state.selectedSourceLanguage)
        )
      })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
      console.log('RESULTATS: ' + filteredAccountsBySourceAndDomain)
    }
    if (
      selectedTargetLanguage !== 'select' &&
      this.state.selectedDomain == 'select' &&
      this.state.selectedSourceLanguage !== 'select'
    ) {
      let filteredAccountsBySourceAndTarget = accounts
        .filter(account => {
          return (
            api.checkSourceLanguages(account) !== null &&
            api
              .checkSourceLanguages(account)
              .includes(this.state.selectedSourceLanguage)
          )
        })
        .filter(account => {
          return (
            api.checkTargetLanguages(account) !== null &&
            api.checkTargetLanguages(account).includes(selectedTargetLanguage)
          )
        })
      this.setState({ filteredAccounts: filteredAccountsBySourceAndTarget })
    }
    if (
      selectedTargetLanguage == 'select' &&
      this.state.selectedDomain !== 'select' &&
      this.state.selectedSourceLanguage == 'select'
    ) {
      let filteredAccountsByDomains = accounts.filter(account => {
        return api.displayDomains(account) == this.state.selectedDomain
      })
      this.setState({ filteredAccounts: filteredAccountsByDomains })
    }
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

  componentDidUpdate (oldProps) {
    const newProps = this.props

    if (oldProps !== newProps) {
      this.setState({ accounts: this.state.accounts })
    }
    console.log(newProps)
    console.log(this.state)
  }

  render () {
    const roles = this.state.roles
    const accounts = this.state.accounts
    const domains = this.state.domains
    const languages = this.state.languages
    const selectedDomain = this.state.selectedDomain
    const selectedSourceLanguage = this.state.selectedSourceLanguage
    const selectedTargetLanguage = this.state.selectedTargetLanguage
    const filteredAccounts = this.state.filteredAccounts

    console.log(this.state)

    return (
      <div className='monthly-planning'>
        <Grid fluid>
          <Card
            title='Monthly Planning'
            category='Your internal translation requests marketplace'
            ctTableFullWidth
            ctTableResponsive
            content={
              <div className='global-container-weekly'>
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
                <div className='container-month-view'>
                  <SelectTranslatorsMonthly
                    accounts={this.state.accounts}
                    filteredAccounts={this.state.filteredAccounts}
                    selectedTargetLanguage={this.state.selectedTargetLanguage}
                    selectedSourceLanguage={this.state.selectedSourceLanguage}
                    selectedDomain={this.state.selectedDomain}
                  />
                  <MonthView passFilteredDomain={this.props.filteredDomain} />
                </div>
                <div className='container-month-view-bottom'>
                  <Filter
                    passSelectedTargetLanguage={this.updateTargetState}
                    passSelectedSourceLanguage={this.updateSourceState}
                    passSelectedDomain={this.updateDomainState}
                    domains={this.state.domains}
                    languages={this.state.languages}
                  />
                  <WeekTasks />
                </div>
              </div>
            }
          />
        </Grid>
      </div>
    )
  }
}

export default MonthlyPlanning
