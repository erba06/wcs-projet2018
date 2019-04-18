import React from 'react'
import { Modal } from 'react-bootstrap'
import Button from 'components/CustomButton/CustomButton.jsx'
import moment from 'moment'

class TranslationRequestDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTranslation: []
    }
    console.log(props)
    console.log(this.state)
  }

  render() {
    const selectedTranslation = this.props.selectedTranslation
    console.log(selectedTranslation)

    /* Nested object access pattern: check if user exists, if not,
              create an empty object on the fly. This way, the next level key
              will always be accessed from an object that exists or an empty object,
               but never from undefined. */

    const jobTypeName = (selectedTranslation.jobType || {}).jobTypeName || {}
    const linguistFirstName =
      (selectedTranslation.linguist || {} || null).firstName || {}
    const linguistLastName =
      (selectedTranslation.linguist || {} || null).lastName || {}
    const linguistEmail =
      (selectedTranslation.linguist || {} || null).email || {}
    const requesterFirstName =
      (selectedTranslation.requester || {}).firstName || {}
    const requesterLastName =
      (selectedTranslation.requester || {}).lastName || {}
    const requesterEmail = (selectedTranslation.requester || {}).email || {}
    const sourceLanguageName =
      (selectedTranslation.source || {}).languageName || {}
    const sourceLanguageCode =
      (selectedTranslation.source || {}).languageCode || {}
    const sourceIsNeutralLanguage =
      (selectedTranslation.source || {}).isNeutralLanguage || {}
    const targetLanguageName =
      (selectedTranslation.source || {}).languageName || {}
    const targetLanguageCode =
      (selectedTranslation.source || {}).languageCode || {}
    const targetIsNeutralLanguage =
      (selectedTranslation.source || {}).isNeutralLanguage || {}

    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Translation Request Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='requestDetails'>
          <ul class='list-group'>
            <li class='list-group-item'>
              <span>Client name:</span> {selectedTranslation.clientName}
            </li>
            <li class='list-group-item'>
              <span>Jobtype name:</span> {jobTypeName}
            </li>
            <li class='list-group-item'>
              <span>Request date:</span>{' '}
              {moment(selectedTranslation.requestDate).format('DD-MM-YYYY')}
            </li>
            <li class='list-group-item'>
              <span>Deadline:</span>{' '}
              {moment(selectedTranslation.deadline).format('DD-MM-YYYY')}
            </li>

            <li class='list-group-item'>
              <span>Wordcount:</span> {selectedTranslation.wordCount} words
            </li>
            <li class='list-group-item'>
              <span>WWC:</span> {selectedTranslation.wwc} words
            </li>
            <li class='list-group-item'>
              <span>Rejected:</span>{' '}
              {selectedTranslation.rejected ? 'Yes' : 'No'}
            </li>
          </ul>
          <div className='container-details'>
            {selectedTranslation.linguist ? (
              <ul class='list-group'>
                <li class='list-group-item'>
                  <span>Linguist firstname:</span> {linguistFirstName}
                </li>
                <li class='list-group-item'>
                  <span>Linguist lastname:</span> {linguistLastName}
                </li>
                <li class='list-group-item'>
                  <span>Email:</span> {linguistEmail}
                </li>
              </ul>
            ) : (
                <ul class='list-group'>
                  <li class='list-group-item'>
                    <span>Linguist firstname:</span> none
                </li>
                  <li class='list-group-item'>
                    <span>Linguist lastname:</span> none
                </li>
                  <li class='list-group-item'>
                    <span>Email:</span> none
                </li>
                </ul>
              )}

            <ul class='list-group'>
              <li class='list-group-item'>
                <span>Requester firstname:</span> {requesterFirstName}
              </li>
              <li class='list-group-item'>
                <span>Requester lastname:</span> {requesterLastName}
              </li>
              <li class='list-group-item'>
                <span>Email:</span> {requesterEmail}
              </li>
            </ul>
          </div>
          <div className='container-details'>
            <ul class='list-group'>
              <li class='list-group-item'>
                <span>Source language name:</span> {sourceLanguageName}
              </li>
              <li class='list-group-item'>
                <span>Source language code:</span> {sourceLanguageCode}
              </li>
              <li class='list-group-item'>
                <span>Is neutral:</span>{' '}
                {sourceIsNeutralLanguage ? 'Yes' : 'No'}
              </li>
            </ul>

            <ul class='list-group'>
              <li class='list-group-item'>
                <span>Target language name:</span> {targetLanguageName}
              </li>
              <li class='list-group-item'>
                <span>Target language code:</span> {targetLanguageCode}
              </li>
              <li class='list-group-item'>
                <span>Is neutral:</span>{' '}
                {targetIsNeutralLanguage ? 'Yes' : 'No'}
              </li>
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default TranslationRequestDetails
