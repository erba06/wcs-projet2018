import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import { Link } from 'react-router-dom'
import 'assets/css/admin.css'
import api from '../../api'
import apiService from '../../api/apiService'
import SelectTranslators from 'components/Planning/SelectTranslators'
import Filter from '../../components/Planning/Filter'
import DatePickerComponent from '../../components/DateTimePicker/DateTimePicker'
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'

class WorkingHours extends Component {
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

  /* FILTERS */

  // filterAccountDomain = selectedDomain => {
  //     let accounts = this.state.accounts
  //     if (
  //         selectedDomain !== 'select' &&
  //         (this.state.selectedSourceLanguage == 'select' &&
  //             this.state.selectedTargetLanguage == 'select')
  //     ) {
  //         console.log('SELECTEDOM' + selectedDomain)
  //         let filteredAccountsByDomains = accounts.filter(account => {
  //             return (
  //                 api.displayDomains(account) !== null &&
  //                 api.displayDomains(account).includes(selectedDomain)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByDomains })

  //         console.log('render11')
  //     }

  //     if (
  //         selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage == 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         this.setState({ filteredAccounts: this.state.accounts })
  //     }

  //     if (
  //         selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage !== 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         let filteredAccountsBySource = accounts.filter(account => {
  //             return (
  //                 api.checkSourceLanguages(account) !== null &&
  //                 api
  //                     .checkSourceLanguages(account)
  //                     .includes(this.state.selectedSourceLanguage)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsBySource })
  //         console.log('render12')

  //     }
  //     if (
  //         selectedDomain !== 'select' &&
  //         this.state.selectedSourceLanguage !== 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         let filteredAccountsByDomainsAndSource = accounts
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api
  //                         .checkSourceLanguages(account)
  //                         .includes(this.state.selectedSourceLanguage)
  //                 )
  //             })
  //             .filter(account => {
  //                 api.displayDomains(account) !== null &&
  //                     api.displayDomains(account).includes(this.state.selectedDomain)
  //             })
  //         this.setState({ filteredAccounts: filteredAccountsByDomainsAndSource })
  //         console.log('render13')
  //         console.log(filteredAccountsByDomainsAndSource)

  //     }
  //     if (this.state.filteredAccounts !== [] && this.state.selectedDomain !== 'select') {
  //         let filteredAccountsByDomainsAndOther = this.state.filteredAccounts.filter(account => {
  //             return (
  //                 api.displayDomains(account) !== null &&
  //                 api.displayDomains(account).includes(this.state.selectedDomain)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByDomainsAndOther })

  //     }
  //     if (
  //         selectedDomain !== 'select' &&
  //         this.state.selectedSourceLanguage !== 'select' &&
  //         this.state.selectedTargetLanguage !== 'select'
  //     ) {
  //         let filteredAccountsByDomainsAndSourceAndTargets = accounts.filter(
  //             account => {
  //                 (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api
  //                         .checkSourceLanguages(account)
  //                         .includes(this.state.selectedSourceLanguage)
  //                 ).filter(res => {
  //                     (
  //                         api.checkTargetLanguages(res) !== null &&
  //                         api
  //                             .checkTargetLanguages(res)
  //                             .includes(this.state.selectedTargetLanguage)
  //                     )
  //                 })
  //             }
  //         )
  //         this.setState({
  //             filteredAccounts: filteredAccountsByDomainsAndSourceAndTargets
  //         })
  //         console.log('render14')

  //     }
  //     if (
  //         selectedDomain !== 'select' &&
  //         this.state.selectedSourceLanguage !== 'select' &&
  //         this.state.selectedTargetLanguage !== 'select'
  //     ) {
  //         let filteredAccountsByDomainsAndSourceAndTargets = accounts
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api
  //                         .checkSourceLanguages(account)
  //                         .includes(this.state.selectedSourceLanguage)
  //                 )
  //             })
  //             .filter(account => {
  //                 return (
  //                     api.checkTargetLanguages(account) !== null &&
  //                     api
  //                         .checkTargetLanguages(account)
  //                         .includes(this.state.selectedTargetLanguage)
  //                 )
  //             })
  //         this.setState({
  //             filteredAccounts: filteredAccountsByDomainsAndSourceAndTargets
  //         })
  //         console.log('render15')
  //     }
  // }

  // filterAccountSource = selectedSourceLanguage => {
  //     let accounts = this.state.accounts
  //     if (
  //         selectedSourceLanguage !== 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         let filteredAccountsBySource = accounts.filter(account => {
  //             return (
  //                 api.checkSourceLanguages(account) !== null &&
  //                 api.checkSourceLanguages(account).includes(selectedSourceLanguage)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsBySource })
  //         console.log('FILTRES: ')
  //         console.log(filteredAccountsBySource)
  //         console.log('render1')
  //     }
  //     if (this.state.filteredAccounts !== [] && this.state.selectedDomain !== 'select') {
  //         let filteredAccountsByDomainsAndOther = this.state.filteredAccounts.filter(account => {
  //             return (
  //                 api.displayDomains(account) !== null &&
  //                 api.displayDomains(account).includes(this.state.selectedDomain)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByDomainsAndOther })

  //         console.log(filteredAccountsByDomainsAndOther)
  //         console.log('render16')
  //     }
  //     if (
  //         selectedSourceLanguage == 'select' &&
  //         this.state.selectedSourceLanguage == 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         this.setState({ filteredAccounts: this.state.accounts })
  //         console.log('render2')
  //     }
  //     if (
  //         this.state.selectedTargetLanguage !== 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage == 'select'
  //     ) {
  //         let filteredAccountsByTarget = accounts.filter(account => {
  //             return (
  //                 api.checkTargetLanguages(account) !== null &&
  //                 api.checkTargetLanguages(account).includes(this.state.selectedTargetLanguage)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByTarget })
  //         console.log(filteredAccountsByTarget)
  //         console.log('render17')
  //     }

  //     if (
  //         selectedSourceLanguage == 'select' &&
  //         this.state.selectedDomain !== 'select' &&
  //         this.state.selectedTargetLanguage == 'select'
  //     ) {
  //         let filteredAccountsByDomains = accounts.filter(account => {
  //             return (
  //                 api.displayDomains(account) !== null &&
  //                 api.displayDomains(account).includes(this.state.selectedDomain)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByDomains })
  //         console.log('render3')
  //     }
  //     if (
  //         selectedSourceLanguage !== 'select' &&
  //         this.state.selectedDomain !== 'select' &&
  //         this.state.selectedDomain == 'select'
  //     ) {
  //         let filteredAccountsBySourceAndDomain = this.state.accounts
  //             .filter(account => {
  //                 return api.displayDomains(account) == this.state.selectedDomain
  //             })
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api.checkSourceLanguages(account) == selectedSourceLanguage
  //                 )
  //             })
  //         this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
  //         console.log('render4')
  //     }
  //     if (
  //         this.state.filteredAccounts !== 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         selectedSourceLanguage !== 'select'
  //     ) {
  //         let filteredAccountsBySourceAndTarget = this.state.filteredAccounts
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api.checkSourceLanguages(account).includes(selectedSourceLanguage)
  //                 )
  //             })

  //         this.setState({ filteredAccounts: filteredAccountsBySourceAndTarget })
  //         console.log('render5')
  //     }
  // }

  // filterAccountTarget = selectedTargetLanguage => {
  //     let accounts = this.state.accounts
  //     if (
  //         selectedTargetLanguage !== 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage == 'select'
  //     ) {
  //         let filteredAccountsByTarget = accounts.filter(account => {
  //             return (
  //                 api.checkTargetLanguages(account) !== null &&
  //                 api.checkTargetLanguages(account).includes(selectedTargetLanguage)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByTarget })
  //         console.log(filteredAccountsByTarget)
  //         console.log('render6')
  //     }

  //     if (
  //         selectedTargetLanguage == 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage == 'select'
  //     ) {
  //         this.setState({ filteredAccounts: this.state.accounts })
  //     }
  //     if (
  //         selectedTargetLanguage == 'select' &&
  //         this.state.selectedDomain !== 'select' &&
  //         this.state.selectedSourceLanguage !== 'select'
  //     ) {
  //         let filteredAccountsBySourceAndDomain = accounts
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api
  //                         .checkSourceLanguages(account)
  //                         .includes(this.state.selectedSourceLanguage)
  //                 )
  //             })
  //             .filter(res => {
  //                 return api.displayDomains(res) == this.state.selectedDomain
  //             })
  //         this.setState({ filteredAccounts: filteredAccountsBySourceAndDomain })
  //         console.log('RESULTATS: ' + filteredAccountsBySourceAndDomain)
  //         console.log('render7')
  //     }
  //     if (
  //         selectedTargetLanguage == 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage !== 'select'
  //     ) {
  //         let filteredAccountsBySource = accounts.filter(account => {
  //             return (
  //                 api.checkSourceLanguages(account) !== null &&
  //                 api
  //                     .checkSourceLanguages(account)
  //                     .includes(this.state.selectedSourceLanguage)
  //             )
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsBySource })
  //         console.log('RESULTATS: ' + filteredAccountsBySource)
  //         console.log('render8')
  //     }
  //     if (
  //         selectedTargetLanguage !== 'select' &&
  //         this.state.selectedDomain == 'select' &&
  //         this.state.selectedSourceLanguage !== 'select'
  //     ) {
  //         let filteredAccountsBySourceAndTarget = accounts
  //             .filter(account => {
  //                 return (
  //                     api.checkSourceLanguages(account) !== null &&
  //                     api
  //                         .checkSourceLanguages(account)
  //                         .includes(this.state.selectedSourceLanguage)
  //                 )
  //             })
  //             .filter(account => {
  //                 return (
  //                     api.checkTargetLanguages(account) !== null &&
  //                     api.checkTargetLanguages(account).includes(selectedTargetLanguage)
  //                 )
  //             })
  //         this.setState({ filteredAccounts: filteredAccountsBySourceAndTarget })
  //         console.log('render9')
  //     }
  //     if (
  //         selectedTargetLanguage == 'select' &&
  //         this.state.selectedDomain !== 'select' &&
  //         this.state.selectedSourceLanguage == 'select'
  //     ) {
  //         let filteredAccountsByDomains = accounts.filter(account => {
  //             return api.displayDomains(account) == this.state.selectedDomain
  //         })
  //         this.setState({ filteredAccounts: filteredAccountsByDomains })
  //         console.log('render10')
  //     }
  // }

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
    const selectedSourceLanguage = this.state.selectedSourceLanguage
    const selectedTargetLanguage = this.state.selectedTargetLanguage
    const filteredAccounts = this.state.filteredAccounts
    console.log(this.state)

    return (
      <div className='content'>
        <Grid fluid>
          <Card
            title='Working hours'
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
                    <Filter
                      passSelectedTargetLanguage={this.updateTargetState}
                      passSelectedSourceLanguage={this.updateSourceState}
                      passSelectedDomain={this.updateDomainState}
                      domains={this.state.domains}
                      languages={this.state.languages}
                    />
                  </div>
                  <div className='container-working-hours'>
                    <div className='working-hours'>
                      <i class='fas fa-clock' />
                      Manage working hours{' '}
                    </div>
                    <div className='container-select-month'>
                      <div className='select-month'>Select a month:</div>
                      <div className='datetimepicker'>
                        <DateTimePicker />
                      </div>
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

export default WorkingHours
