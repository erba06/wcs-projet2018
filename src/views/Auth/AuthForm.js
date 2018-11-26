import React, { Component } from 'react'
import api from '../../api'

import AuthService from './AuthService'
import '../../assets/css/authform.css'

class AuthForm extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleIsRemembered = this.handleIsRemembered.bind(this)

    this.Auth = new AuthService()
    this.state = {
      usernameOrEmail: '',
      password: '',
      message: '',
      isRemembered: false
    }
  }

  handleIsRemembered = event => {
    event.preventDefault()

    let name = event.target.name
    console.log(event.target.checked)
    this.setState({
      [name]: event.target.checked
    })
  }

  handleChange = e => {
    e.preventDefault()

    const { name: key, value } = e.target
    console.log(value)
    this.setState({ [key]: value })
  }

  handleFormSubmit (e) {
    e.preventDefault()

    this.Auth
      .login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/')
      })
      .catch(err => {
        alert(err)
      })
  }

  login = e => {
    e.preventDefault()

    this.setState({ message: '', isRemembered: '' })

    const credentials = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password,
      isRemembered: this.state.isRemembered
    }
    api.logIn(credentials).then(response => {
      console.log('test' + response)
      if (response.error) {
        this.setState({ message: response.error })
      }
    })
  }

  signout = e => {
    e.preventDefault()

    api.signOut().then(() => this.props.onLoggedOut())
  }

  render () {
    const doc = this.state.doc
    return (
      <div id='login'>
        <div className='container'>
          <div
            id='login-row'
            className='row justify-content-center align-items-center'
          >
            <div id='login-column' className='col-md-6'>
              <div id='login-box' className='col-md-12'>
                <form
                  onSubmit={this.login}
                  id='login-form'
                  className='form'
                  action=''
                  method='post'
                >
                  <h3 className='text-center text-info'>Login</h3>
                  <div className='form-group'>
                    <label htmlFor='username' className='text-info'>
                      Username or e-mail:
                    </label>
                    <input
                      type='text'
                      name='usernameOrEmail'
                      id='usernameOrEmail'
                      autoComplete
                      required
                      placeholder='Enter your username or e-mail'
                      className='form-control'
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password' className='text-info'>
                      Password:
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Enter your password'
                      required
                      className='form-control'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='remember-me' className='text-info'>
                      <span>Remember me</span>&nbsp;
                      <span>
                        <input
                          id='isRemembered'
                          name='isRemembered'
                          type='checkbox'
                          onChange={this.handleIsRemembered}
                        />
                      </span>
                    </label>
                    <input
                      type='submit'
                      name='submit'
                      className='btn btn-info btn-md btn-fill pull-right'
                      value='submit'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AuthForm
