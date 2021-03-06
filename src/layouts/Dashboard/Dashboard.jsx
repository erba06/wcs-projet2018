import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Sidebar from 'components/Sidebar/Sidebar'

import { style } from 'variables/Variables.jsx'

import dashboardRoutes from 'routes/dashboard.jsx'
import translationRequestsRoutes from 'routes/translationrequests.jsx'
import adminRoutes from 'routes/admin.jsx'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleNotificationClick = this.handleNotificationClick.bind(this)
    this.state = {
      _notificationSystem: null
    }
  }
  handleNotificationClick (position) {
    var color = Math.floor(Math.random() * 4 + 1)
    var level
    switch (color) {
      case 1:
        level = 'success'
        break
      case 2:
        level = 'warning'
        break
      case 3:
        level = 'error'
        break
      case 4:
        level = 'info'
        break
      default:
        break
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify='icon' className='pe-7s-gift' />,
      message: (
        <div>
          Welcome to <b>MyToolBox</b>.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    })
  }
  componentDidMount () {
    this.setState({ _notificationSystem: this.refs.notificationSystem })
    var _notificationSystem = this.refs.notificationSystem
    var color = Math.floor(Math.random() * 4 + 1)
    var level
    switch (color) {
      case 1:
        level = 'success'
        break
      case 2:
        level = 'warning'
        break
      case 3:
        level = 'error'
        break
      case 4:
        level = 'info'
        break
      default:
        break
    }
    _notificationSystem.addNotification({
      title: <span data-notify='icon' className='pe-7s-gift' />,
      message: (
        <div>
          Welcome to <b>MyToolBox</b>.
        </div>
      ),
      level: level,
      position: 'tr',
      autoDismiss: 15
    })
  }
  componentDidUpdate (e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      this.refs.mainPanel.scrollTop = 0
    }
  }
  render () {
    return (
      <div className='wrapper'>
        <NotificationSystem ref='notificationSystem' style={style} />
        <Sidebar {...this.props} />
        <div id='main-panel' className='main-panel' ref='mainPanel'>
          <Header {...this.props} />
          <Switch>
            {adminRoutes.map((prop, key) => {
              if (prop.path === '/manageusers') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/manageroles') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/managelanguages') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/managedomains') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/editdomain/:id') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/editlanguage/:id') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/addlanguage') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/adddomain') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/editrole/:id') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/addrole') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/login') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/edituser/:id') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/adduser') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/weeklyplanning') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/monthlyplanning') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              } else if (prop.path === '/recurringtasks') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/absences') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/taskfinder') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/workinghours') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/addabsence') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/recurringtask') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              else if (prop.path === '/taskfinder') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              return null
            })}
            {translationRequestsRoutes.map((prop, key) => {
              if (prop.path === '/translationrequestsform') {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                )
              }
              return null
            })}
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === 'Notifications') {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                )
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              )
            })}
          </Switch>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Dashboard
