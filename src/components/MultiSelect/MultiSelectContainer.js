import React, { Component } from 'react'
import { MultiSelect } from 'react-widgets'

class MultiSelectContainer extends React.Component {
  constructor (props) {
    super(props)

    this.filterType = 'contains'
    this.onChange = this.onChange.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onFilter = this.onFilter.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onDataBound = this.onDataBound.bind(this)
  }

  onChange = e => {
    console.log('event :: change')
  }

  onOpen = e => {
    console.log('event :: open')
  }

  onClose = e => {
    console.log('event :: close')
  }

  onSelect = e => {
    var dataItem = e.dataItem
    console.log('event :: select (' + dataItem + ')')
  }

  onDataBound = e => {
    console.log('event :: dataBound')
  }

  onFilter = e => {
    console.log('event :: filter')
  }

  render () {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-6 example-col'>
          <MultiSelect
            change={this.onChange}
            open={this.onOpen}
            filter={this.filterType}
            filtering={this.onFilter}
            close={this.onClose}
            select={this.onSelect}
            dataBound={this.onDataBound}
            dataSource={this.dataSource}
          />
        </div>
      </div>
    )
  }
}
export default MultiSelectContainer
