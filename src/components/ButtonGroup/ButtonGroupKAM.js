import React from 'react'
import Button from 'components/CustomButton/CustomButton.jsx'
import TranslationRequestDetails from '../../views/TranslationRequests/TranslationRequestDetails'
import { ButtonGroup } from 'react-bootstrap'
import api from '../../api'
import Alert from 'react-s-alert'

class ButtonGroupKAM extends React.Component {
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
        console.log(props)
    }

    showDetails = prop => {
        this.setState({ selectedTranslation: prop })
    }

    render() {
        const translationRequests = this.props.translationRequests
        console.log(translationRequests)
        const selectedTranslation = this.state.selectedTranslation
        console.log(selectedTranslation)
        let prop = this.props.prop
        let modalClose = () => this.setState({ modalShow: false })

        return (
            <div>
                <ButtonGroup className="buttonGroup">
                    <Button
                        onClick={() => {
                            this.showDetails(
                                prop
                            );
                            this.setState(
                                {
                                    modalShow: true,
                                }
                            );
                        }}
                        bsStyle="Warning"
                        fill
                    >
                        Details
                                    </Button>

                    <TranslationRequestDetails
                        selectedTranslation={
                            selectedTranslation
                        }
                        show={
                            this.state
                                .modalShow
                        }
                        onHide={
                            modalClose
                        }
                    />
                    <Button
                        onClick={() => {
                            api.renotifyTranslationRequest(
                                prop.id
                            ); () => this.syncDatas()
                        }}
                        bsStyle="primary"
                        fill
                        disabled={ prop.linguist || prop.rejected } //Button disabled if translation assigned or accepted
                    >
                        Renotify
                                    </Button>
                    <Button
                        onClick={() =>
                            api.deleteTranslationRequest(
                                prop.id
                            )}
                        bsStyle="success"
                        fill
                    >
                        Delete
                                    </Button>
                    {/*<Link to="/translationrequestsform">
                        <Button
                            bsStyle="info"
                            fill
                        >
                            Create
                                      </Button>
                            </Link> */}
                    <Alert stack={{ limit: 3 }} />
                </ButtonGroup>
            </div>
        )
    }
}
export default ButtonGroupKAM
