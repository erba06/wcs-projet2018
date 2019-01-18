import React, { Component } from 'react'
import ManageLanguages from './views/Admin/ManageLanguages'
import ManageDomains from './views/Admin/ManageDomains'
import apiService from '../../api/apiService'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      language: [],
      domains: [],
      roles: []
    }

    syncDatas = () => {
      apiService.getApiEndpoint('GetDomains')
        .then(domains => { this.setState({ domains: domains.data }) })
      apiService.getApiEndpoint('GetRole', null, { id: newId })
        .then(roles => {this.setState({ roles: roles.data }) })
      }

    componentDidMount() {
      this.syncDatas()
    }

  render () {
    const { domains } = this.state.domains
      console.log(domains)
    const {roles } = this.state.roles

    return (
      <div className='app'>
        <ManageLanguages getLanguageId={this.getLanguageId}
        />
      </div>
    )
  }
}

export default App
