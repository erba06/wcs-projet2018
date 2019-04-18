import React from 'react'
import Button from 'components/CustomButton/CustomButton.jsx'
import TranslationRequestDetails from '../../views/TranslationRequests/TranslationRequestDetails'
import { ButtonGroup } from 'react-bootstrap'
import api from '../../api'
//import store2 from '../../store2'

class ButtonGroupTranslator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translationRequests: [],
      selectedTranslation: [],
      loggedAs: undefined,
      authInfo: [],
      modalShow: false
    }
    console.log(this.state)
  }

  showDetails = prop => {
    this.setState({ selectedTranslation: prop })
  }
  // selectTranslation = selectedTranslation => {
  //   store2.dispatch({ type: 'SELECT_TRANSLATION', as: selectedTranslation })
  // }

  render() {
    console.log(this.props)
    //console.log(this.props.linguist.id)
    console.log(this.props.authInfo.userId)
    const translationRequests = this.props.translationRequests
    console.log(translationRequests)
    const selectedTranslation = this.state.selectedTranslation
    console.log(selectedTranslation)
    let prop = this.props.prop
    let modalClose = () => this.setState({ modalShow: false })

    return (
      <div>
        {/* }  {translationRequests.map((prop, key) => { */}
        <ButtonGroup className='buttonGroup'>
          <Button key={this.props.id}
            onClick={() => {
              this.showDetails(this.state.selectedTranslation.id)
              this.setState({ modalShow: true, selectedTranslation: this.props.prop })
            }}
            bsStyle='Warning'
            fill
          >
            Details
          </Button>

          <TranslationRequestDetails
            selectedTranslation={selectedTranslation}
            show={this.state.modalShow}
            onHide={modalClose}
          />
          <Button
            onClick={() => {
              this.setState({ selectedTranslation: this.props.prop })
              api.acceptAssignment(this.state.selectedTranslation.id)
            }
            }
            bsStyle='primary'
            disabled={prop.linguist && prop.linguist.id !==
              this.props.authInfo.id} //Button disabled if translation assigned 

            fill
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              this.setState({ selectedTranslation: this.props.prop })
              api.cancelAssignment(this.state.selectedTranslation.id)
            }
            }
            bsStyle='success'
            fill
            disabled={prop.linguist && prop.linguist.id !==
              this.props.authInfo.userId || prop.linguist== undefined}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await this.setState({ selectedTranslation: this.props.prop })
              api.rejectTranslationRequest(this.state.selectedTranslation.id)
            }}
            bsStyle='default'
            fill
            disabled={this.props.prop.rejected==true}
          >
            Reject
          </Button>
        </ButtonGroup>
        {/*       })} */}
      </div>
    )
  }
}
export default ButtonGroupTranslator

