import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox
} from 'react-bootstrap'

import { Card } from 'components/Card/Card.jsx'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'

class Converter extends Component {
  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Studio XML to M1 Converter'
                category='Use this form to convert one or more Trados Studio analysis log into an M1 spreadsheet.'
                content={
                  <form>
                    <Row>
                      <Row>
                        <Col md={10}>
                          <a
                            className='modal-info'
                            data-toggle='modal'
                            data-target='#myModal'
                          >
                            <i className='fa fa-info-circle' />More information
                          </a>
                          <div className='container'>
                            <div id='myModal' class='modal fade' role='dialog'>
                              <div className='modal-dialog modal-dialog-centered'>
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <button
                                      type='button'
                                      className='close'
                                      data-dismiss='modal'
                                    />
                                    <h4 className='modal-title'>
                                      More information
                                    </h4>
                                  </div>
                                  <div className='modal-body'>
                                    <p>
                                      The converter only works for the following fuzzy categories: 50-74, 75-84, 85-94, 95-99.
                                      It will not work if one of the provided Studio log lacks any of these categories.
                                      Note that internal fuzzies an TM fuzzies are merged into the same category.
                                      {' '}
                                    </p>
                                  </div>
                                  <div class='modal-footer'>
                                    <button
                                      type='button'
                                      class='btn btn-info'
                                      data-dismiss='modal'
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8} className='dragAndDrop'>
                          <StyledDropZone
                            onDrop={(file, text) => console.log(file, text)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={10} className='additionalOptions'>
                          <p>
                            <a
                              data-toggle='collapse'
                              href='#footwear'
                              aria-expanded='false'
                              aria-controls='footwear'
                            >
                              <i class='fas fa-wrench' /> Additional options
                            </a>
                          </p>
                          <div class='collapse' id='footwear'>
                            <fieldset class='scheduler-border'>

                              <FormGroup>
                                <Col sm={12}>
                                  <Checkbox>
                                    Use characters statistics instead of words (Asian languages)
                                  </Checkbox>
                                </Col>
                              </FormGroup>
                              <legend class='scheduler-border'>
                                Wordcount info
                              </legend>
                              <Row>
                                <Col md={3}>
                                  <FormGroup controlId='repetitions'>
                                    <ControlLabel>Repetitions</ControlLabel>
                                    <FormControl
                                      type='text'
                                      autoFocus
                                      name='repetitions'
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={3}>
                                  <FormGroup controlId='CM-PM'>
                                    <ControlLabel>CM and PM</ControlLabel>
                                    <FormControl
                                      type='text'
                                      name='CM-PM'
                                      autoFocus
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={3}>
                                  <FormGroup controlId='percent'>
                                    <ControlLabel>100%</ControlLabel>
                                    <FormControl
                                      type='text'
                                      autoFocus
                                      name='percent'
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>

                                <Col md={3}>
                                  <FormGroup controlId='high-fuzzy-id'>
                                    <ControlLabel>95-99%</ControlLabel>
                                    <FormControl
                                      type='text'
                                      autoFocus
                                      name='email'
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={3}>
                                  <FormGroup controlId='middle-fuzzy-id'>
                                    <ControlLabel>85-94%</ControlLabel>
                                    <FormControl type='text' name='fuzzy' />
                                  </FormGroup>
                                </Col>
                                <Col md={3}>
                                  <FormGroup controlId='low-fuzzy-id'>
                                    <ControlLabel>75-84%</ControlLabel>
                                    <FormControl type='text' name='fuzzy' />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <div class='col-md-3'>
                                  <div class='input-group'>
                                    <span class='input-group-btn'>
                                      <button
                                        type='button'
                                        class='btn btn-danger btn-number'
                                        data-type='minus'
                                        data-field='quant[1]'
                                      >
                                        <span class='glyphicon glyphicon-minus' />
                                      </button>
                                    </span>
                                    <input
                                      type='text'
                                      name='quant[1]'
                                      class='form-control input-number'
                                      defaultValue='1'
                                      min='1'
                                      max='10'
                                    />
                                    <span class='input-group-btn'>
                                      <button
                                        type='button'
                                        class='btn btn-success btn-number'
                                        data-type='plus'
                                        data-field='quant[1]'
                                      >
                                        <span class='glyphicon glyphicon-plus' />
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </Row>
                            </fieldset>
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Converter
