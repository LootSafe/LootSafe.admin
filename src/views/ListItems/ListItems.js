import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Progress, CardHeader, CardBody} from 'reactstrap';
import Web3 from 'web3'
const web3 = new Web3()

class ListItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      toDelist: '0x0',
      modal: false,
      error: '',
      yubikey: ''
    }
    this.toggle = this.toggle.bind(this)
    this.delist = this.delist.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    fetch(`${apiAddr}/item/list`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          json.data.items.map(item => {
            fetch(`${apiAddr}/item/get/${item}`)
            .then(res => res.json())
            .then(json => {
              const temp = this.state.items
              const tempItem = json.data
              tempItem.name = item
              temp.push(tempItem)
              this.setState({
                items: temp
              })
            })
          })
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          })
        }
      })
  }

  produceRows() {
    return this.state.items.map(item => {
      return (
        <tr key={item.name}>
          <td>
            <img src={`/img/icons/${web3.utils.toUtf8(item.id)}.png`} width="50" />
          </td>
          <td>
            <div>{web3.utils.toUtf8(item.name)}</div>
            <div className="small text-muted">
              {item.name}
            </div>
          </td>
          <td>
            {web3.utils.toUtf8(item.id)}
          </td>
          <td>
            {item.totalSupply}
          </td>
          <td>
            <small><pre>{item.address}</pre></small>
          </td>
          <td>
            {item.created}
          </td>
          <td className="text-center">
            0
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => {
              this.setState({
                toDelist: item.name,
                modal: true
              })
            }}>Delist</button>
          </td>
        </tr>
      )
    })
  }

  delist() {
    fetch(`${apiAddr}/item/clearAvailability`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'key': apiKey,
        'otp': this.state.yubikey
      },
      body: JSON.stringify({
        name: web3.utils.toUtf8(this.state.toDelist)
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            modal: false
          })
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          })
        }
      })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delist {web3.utils.toUtf8(this.state.toDelist)}</ModalHeader>
          <ModalBody>
            Are you sure you want to remove the remaining un-circulating supply? This cannot be undone and will remove this item from future loot boxes!
          </ModalBody>
          <ModalFooter>
            <input type="password" className="form-control" id="yubikey" placeholder="Yubikey OTP" onChange={e => {
              this.setState({
                yubikey: e.target.value
              })
            }} onKeyPress={e => {
              if (e.key === 'Enter') {
                this.delist()
              }
            }}/>
            <small id="emailHelp" className="form-text text-muted">Please insert your YubiKey and tap to submit this request.</small>
          </ModalFooter>
        </Modal>
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
          <tr>
            <th> </th>
            <th>Item Name</th>
            <th>ID</th>
            <th>Supply</th>
            <th>Address</th>
            <th>Created On</th>
            <th>Circulating</th>
            <th>Delist</th>
          </tr>
          </thead>
          <tbody>
            { this.produceRows() }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ListItems;
