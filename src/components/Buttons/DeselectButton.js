import React from 'react'
import Button from 'components/CustomButton/CustomButton.jsx'

class DeselectButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState({ isSelected: false }, () => {
      this.props.passPropsIsSelected(this.state.isSelected)
    })
  }

  render () {
    return (
      <Button
        fill
        bsStyle='info'
        bsSize='xsmall'
        onClick={this.handleClick.bind(this)}
      >
        Deselect All
      </Button>
    )
  }
}
export default DeselectButton
