import React, { Component } from 'react'
import apiService from '../../api/apiService'

import { store } from '../../store'
import { connect } from 'react-redux' // Redux
import { withRouter } from 'react-router-dom';


export class Card extends Component {
  state = {
    loggedAs: undefined,
  }


  onLoggedIn = authInfo => {
    store.dispatch({ type: 'LOG_IN', as: authInfo })
    window.location = window.location // reload datas
  }

  onLoggedOut = () => {
    store.dispatch({ type: 'LOG_OUT' })
    window.location = window.location // reload datas
  }

  componentWillMount() {
    apiService.getApiEndpoint('GetWhoAmI').then(authInfo => {
      console.log(authInfo)
      this.setState({ authInfo: authInfo.data })
      store.dispatch({ type: 'LOG_IN', as: authInfo.data.roles })
    })
  }
  render() {
    const { loggedAs } = store.getState()
    console.log(loggedAs instanceof Array)
    let res = [].concat(loggedAs);
    console.log(res.indexOf('KAM'))

    console.log(res)

    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div
          className={"header" + (this.props.hCenter ? " text-center" : "")}
        >
          <h4 className="title">
            {this.props.title}
            <div className="row text-center">
              <span className="fas fa-1.7x fa-user text-center icon-center" />
              <div className="loggedAs-info">
                {loggedAs ?
                  <span className="title text-center">{loggedAs.map(x => x.slice(0, 5)).join('/')}</span>
                  : null
                }
              </div>
            </div>
          </h4>

          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authInfo: state.authInfo
  }
}

export default withRouter(connect(mapStateToProps)(Card));