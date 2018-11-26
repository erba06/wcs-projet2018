import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';
import Button from 'components/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx';
import 'assets/css/admin.css';
import { Link } from 'react-router-dom';

class Admin extends Component {
  render () {
    return (
      <div className='content admin'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Administration'
                category='Manage users, roles, languages, domains'
                ctTableFullWidth
                ctTableResponsive
                content={
                  <ButtonToolbar className='adminButtons'>
                    <Link to='/manageusers'><Button bsSize='large' bsStyle='info' fill block>Manage users</Button></Link>
                    <Link to='/manageroles'><Button bsSize='large' bsStyle='info' fill block>Manage roles</Button></Link>
                    <Link to='/managelanguages'><Button bsSize='large' bsStyle='info' fill block >Manage languages</Button></Link>
                    <Link to='/managedomains'><Button bsSize='large' bsStyle='info' fill block>Manage domains</Button></Link>
                  </ButtonToolbar>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Admin
