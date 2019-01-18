import React from 'react'
import Button from 'components/CustomButton/CustomButton.jsx'

class SelectButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: ''
    }
  }

  handleClick (e) {
    this.setState({ isSelected: true }, () => {
      this.props.passPropsIsSelected(this.state.isSelected)
    })
  }

  render () {
    console.log(this.state)

    return (
      <Button
        fill
        bsStyle='info'
        bsSize='xsmall'
        onClick={this.handleClick.bind(this)}
      >
        Select All
      </Button>
    )
  }
}
export default SelectButton
