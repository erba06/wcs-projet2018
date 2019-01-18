import React, { Component } from 'react'
import '../../../src/assets/css/admin.css'

class ResultPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    console.log(this.props)
    console.log(this.state)
  }

  render () {
    let domains = this.props.domains
    let translators = this.props.translators
    let languages = this.props.languages

    return (
      <div className='list-translators_greyed' >
        <i className='fas fa-2x fa-user' />
        <div className='list-translator-text'>
          <div className='translator-info'>
            <span className='label label-success label-as-badge'>Junior</span>
            <div className='translator-name'>{translators}</div>
            <div className='lg-target-source'>{languages}</div>
            <div className='domain'>{domains}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default ResultPanel
