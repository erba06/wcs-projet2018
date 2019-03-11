import React, { Component } from 'react'
import Alert from 'react-s-alert'

import {
  Grid,
  Row,
  Col,
  ButtonToolbar,
  FormControl,
  ControlLabel,
  Checkbox
} from 'react-bootstrap'
import { Card } from 'components/Card/Card.jsx'
import Button from 'components/CustomButton/CustomButton.jsx'
// import Select from 'react-dropdown-select'
import apiService from '../../api/apiService'
import api from '../../api'
import SelectButton from '../../components/Buttons/SelectButton'
import DeselectButton from '../../components/Buttons/DeselectButton'

class AddAbsence extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      forWhom: '',
      accounts: [],
      selectedAbsence: '',
      selectedforWhom: ''
    }
    console.log(this.props)
  }

  updateIsSelected = props => {
    this.setState({ isSelected: props })
    console.log(props)
  }

  componentDidMount () {
    console.log(this.state)
    apiService
      .getApiEndpoint('GetAccounts')
      .then(accounts => this.updateState(accounts))
      .catch(console.log)
  }

  updateState = accounts => {
    this.setState({ accounts: accounts.data.items })
    console.log(accounts)
  }

  updateStartDateField = event => {
    const startDate = event.target.startDate
    this.setState({ startDate: event.target.value })
    console.log(startDate)
  }
  updateEndDateField = event => {
    const endDate = event.target.endDate
    this.setState({ endDate: event.target.value })
    console.log(endDate)
  }
  updateReasonField = event => {
    const reason = event.target.reason
    this.setState({ reason: event.target.value })
    console.log(reason)
  }
  updateForWhomField = event => {
    const forWhom = event.target.forWhom
    this.setState({ forWhom: event.target.value })
    console.log(this.state)
  }

  updateAbsenceTypeField = event => {
    const AbsenceType = event.target.AbsenceType
    this.setState({ AbsenceType: event.target.value })
    console.log(this.state)
  }
  handleSubmit = e => {
    e.preventDefault()
    const absence = this.state.absence
  }

  render () {
    const accounts = this.state.accounts
    console.log(accounts)
    const startDate = this.state.startDate
    console.log(startDate)
    const endDate = this.state.endDate
    console.log(endDate)
    const reason = this.state.reason
    console.log(reason)
    const forWhom = this.state.forWhom
    console.log(forWhom)
    const isSelected = this.state.isSelected

    console.log(this.state)
    console.log(this.props)

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Manage absences"
                content={
                  <Row>
                    <Col md={12}>
                      <form
                        action="#"
                        onSubmit={this.handleSubmit.bind(this)}
                      >
                        <div className="absence-date-title">
                          <i class="fas fa-plus-square" />
                          <span>Add an absence</span>
                        </div>

                        <div className="absence-dates">
                          <Col md={4}>
                            <ControlLabel>Start date</ControlLabel>
                            <FormControl
                              className="start-date"
                              onChange={this.updateStartDateField.bind(
                                this
                              )}
                            />
                            <Checkbox
                            onChange={this.handleIsAM}
                            >AM</Checkbox>
                            <Checkbox
                              onChange={this.handleIsAM}
                            >PM</Checkbox>
                          </Col>
                          <Col md={4}>
                            <ControlLabel>End date</ControlLabel>
                            <FormControl
                              onChange={this.updateEndDateField.bind(this)}
                            />
                          </Col>
                        </div>

                        {/* <Select options={['red', 'blue', 'green']} onChange={(values) => this.setValues(values)} /> */}
                        <div className="absence-reason">
                          <Col md={10}>
                            <ControlLabel>Reason</ControlLabel>
                            <FormControl
                              className="absence-reason"
                              onChange={this.updateReasonField.bind(this)}
                            />
                          </Col>
                        </div>

                        <div className="who">
                          <Col md={10}>
                            <ControlLabel>For whom*</ControlLabel>

                            <select
                              value={this.state.selectedforWhom}
                              onChange={this.updateForWhomField.bind(this)}
                            >
                              {accounts.map(account => {
                                let isTranslators = api.isTranslator(
                                  account.roles
                                );
                                if (isTranslators) {
                                  return (
                                    <option value={account.id}>
                                      {account.firstName} {account.lastName}
                                    </option>
                                  );
                                }
                                if (isSelected) {
                                  return <option>TEST >test</option>;
                                }
                              })}
                            </select>

                            <div className="buttons">
                              <ButtonToolbar>
                                <SelectButton
                                  passPropsIsSelected={
                                    this.updateIsSelected
                                  }
                                />
                                <DeselectButton
                                  passPropsIsSelected={
                                    this.updateIsSelected
                                  }
                                />
                              </ButtonToolbar>
                            </div>
                          </Col>
                        </div>

                        <div className="absence-type">
                          <Col md={10}>
                            <ControlLabel>Type of absence</ControlLabel>

                            <select
                              value={this.state.selectedAbsence}
                              onChange={this.updateAbsenceTypeField.bind(
                                this
                              )}
                            >
                              {" "}
                              >
                              <option value="standard-absence">
                                Standard
                              </option>
                              <option value="illness-absence">
                                Illness
                              </option>
                              <option selected value="university-absence">
                                University
                              </option>
                              <option value="uncertain-availability-absence">
                                Uncertain availability
                              </option>
                            </select>
                          </Col>
                        </div>

                        <Row>
                          <Col md={12}>
                            <ButtonToolbar>
                              <Button
                                // onClick={() => api.addAbsence(absence)}
                                bsStyle="info"
                                pullLeft
                                fill
                                type="submit"
                              >
                                Submit
                              </Button>
                              <Button
                                bsStyle="default"
                                pullLeft
                                fill
                                type="submit"
                              >
                                Cancel
                              </Button>
                            </ButtonToolbar>
                            <Alert stack={{ limit: 3 }} />
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AddAbsence
