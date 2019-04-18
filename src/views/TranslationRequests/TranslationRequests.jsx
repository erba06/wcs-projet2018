import React, { Component } from 'react'
import TranslationRequestDetails from './TranslationRequestDetails'
import ButtonGroupTranslator from '../../components/ButtonGroup/ButtonGroupTranslator'
import ButtonGroupKAM from '../../components/ButtonGroup/ButtonGroupKAM'
import Button from 'components/CustomButton/CustomButton.jsx'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'
import { thArray } from 'variables/Variables.jsx'
import apiService from '../../api/apiService'
import { store } from '../../store'
import { connect } from 'react-redux' // Redux
import moment from 'moment'

const tdArray = require('mocks/translationform.json')

class TranslationRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translationRequests: [],
      selectedTranslation: [],
      loggedAs: undefined,
      authInfo: [],
      modalShow: false,
    };
    console.log(this.state);
  }

  syncDatas = () => {
    /* returns all translation requests */
    apiService
      .getApiEndpoint("GetTranslationRequests")
      .then(translationRequests => {
        console.log(translationRequests);
        this.setState({ translationRequests: translationRequests.data });
      });
  };

  onLoggedIn = authInfo => {
    store.dispatch({ type: 'LOG_IN', as: authInfo })
    window.location = window.location // reload datas
  }

  onLoggedOut = () => {
    store.dispatch({ type: 'LOG_OUT' })
    window.location = window.location // reload datas
  }

  showDetails = prop => {
    this.setState({ selectedTranslation: prop })
  }

  componentDidMount() {
    this.syncDatas();
    apiService.getApiEndpoint("GetWhoAmI").then(authInfo => {
      console.log(authInfo);

      this.setState({ authInfo: authInfo.data });
      store.dispatch({ type: "LOG_IN", as: authInfo.data.roles });
    });
  }

  render() {
    // let authInfo = this.state.authInfo;
    const { loggedAs } = store.getState();
    console.log(loggedAs instanceof Array)
    let res = [].concat(loggedAs);
    console.log(res.indexOf('KAM'))
    const translationRequests = this.state.translationRequests;
    console.log(translationRequests)

    let modalClose = () => this.setState({ modalShow: false });
    const selectedTranslation = this.state.selectedTranslation

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Translation Requests"
                category="Your internal translation requests marketplace"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {translationRequests.map((prop, key) => {
                        console.log(prop);

                        {
                          if (
                            prop &&
                            prop.jobType &&
                            prop.jobType.jobTypeName &&
                            prop.source &&
                            prop.target &&
                            prop.source.languageName &&
                            prop.target.languageName
                          ) {

                            return (
                              <tr key={key}>
                                <td>{prop.id}</td>
                                <td>
                                  {
                                    prop.source
                                      .languageName
                                  }{" "}
                                  to{" "}
                                  {
                                    prop.target
                                      .languageName
                                  }
                                </td>

                                {prop.linguist ==
                                  null ? (
                                    <td>
                                      <b>
                                        Linguist to be
                                        defined
                                    </b>
                                    </td>
                                  ) : (
                                    <td>
                                      {
                                        prop.linguist
                                          .firstName
                                      }
                                      -
                                    {
                                        prop.linguist
                                          .lastName
                                      }
                                    </td>
                                  )}

                                <td>
                                  {moment(prop.deadline).format('DD-MM-YYYY')}
                                </td>
                                <td>
                                  {
                                    prop.jobType
                                      .jobTypeName
                                  }
                                </td>
                                <td>
                                  {prop.clientName}/
                                  {prop.orderNumber}
                                </td>
                                <td>
                                  {prop.wordCount}
                                </td>
                                <td>{prop.wwc}</td>

                                {prop.linguist ==
                                  null && prop.rejected == false ? (
                                    <td>
                                      <span class="badge badge-inverse">
                                        Unassigned
                                    </span>
                                    </td>
                                  ) : (prop.rejected == true) ? (
                                    <td>
                                      <span class="badge badge-danger">
                                        Rejected
                                    </span>
                                    </td>
                                  ) : prop.linguist
                                    .id !==
                                    this.state
                                      .authInfo[0] &&
                                    prop.linguist
                                      .id !== null &&
                                    Object.values(
                                      this.state
                                        .authInfo
                                    )[0] !==
                                    prop.linguist
                                      .id ? (
                                        <td>
                                          <span class="badge badge-warning">
                                            Assigned
                                    </span>
                                        </td>
                                      ) : prop.linguist
                                        .id ==
                                        Object.values(
                                          this.state
                                            .authInfo
                                        )[0] ? (
                                          <td>
                                            <span class="badge badge-success">
                                              Accepted
                                    </span>
                                          </td>
                                        ) : (
                                          <td>
                                            <span class="badge">
                                              Pending
                                    </span>
                                          </td>
                                        )}
                                {loggedAs.includes(
                                  "Translator"
                                ) ? (
                                    <ButtonGroupTranslator prop={prop} loggedAs={loggedAs}
                                      {...this.state} />
                                  ) : loggedAs.includes(
                                    "KAM"
                                  ) ? (
                                      <ButtonGroupKAM prop={prop}
                                        {...this.state} />
                                    ) : null}
                              </tr>
                            );
                          }
                        }
                      })}
                    </tbody>
                  </Table>
                }
              />
              <Link to="/translationrequestsform">
                <Button bsStyle="info" pullRight fill type="submit">
                  New request
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.authInfo,
    selectedTranslation: state.selectedTranslation
  }
}
export default connect(mapStateToProps)(TranslationRequests)




