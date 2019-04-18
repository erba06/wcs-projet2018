import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { persistor } from '../src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import api from './api'
import AuthForm from './views/Auth/AuthForm'
import indexRoutes from 'routes/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/sass/light-bootstrap-dashboard.css?v=1.2.0'
import './assets/css/demo.css'
import './assets/css/pe-icon-7-stroke.css'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

import reducers from './reducers'


const createStoreWithMiddleware = applyMiddleware()(createStore)

api.onPageLoadChecks().then(status => {
  if (status) {
    ReactDOM.render(
      <Provider
        store={createStoreWithMiddleware(
          reducers,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__({
            latency: 0
          }))}
      >
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route to={prop.path} component={prop.component} key={key} />
                )
              })}
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>,
      document.getElementById('root')
    )
  } else ReactDOM.render(<AuthForm />, document.getElementById('root'))
})
