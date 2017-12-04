import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody} from 'reactstrap';

class UpdateLootboxChances extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uncommon: 20,
      rare: 5,
      epic: 1,
      yubikey: '',
      txid: '',
      tx: '',
      error: false,
      modal: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  createNewItem() {
    fetch(`${apiAddr}/lootbox/chances/update/${this.state.epic}/${this.state.rare}/${this.state.uncommon}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'key': apiKey,
        'otp': this.state.yubikey
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            txid: json.data.tx,
            tx: JSON.stringify(json.data.receipt),
            modal: true
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
          <ModalHeader toggle={this.toggle}>Lootbox chances updated</ModalHeader>
          <ModalBody>
            Lootbox chances updated on the Ethereum network!
            <p>Tx: <small>{this.state.txid}</small></p>
            <pre>
              {this.state.tx}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
        <h2>Update Lootbox Chances</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Uncommon Chance</label>
            <input type="number" className="form-control" id="itemName" aria-describedby="emailHelp" value={this.state.name} placeholder="10..." onChange={e => {
              this.setState({
                uncommon: e.target.value
              })
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Rare Chance</label>
            <input type="number" className="form-control" id="itemName" aria-describedby="emailHelp" value={this.state.name} placeholder="5..." onChange={e => {
              this.setState({
                rare: e.target.value
              })
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Epic Chance</label>
            <input type="number" className="form-control" id="itemName" aria-describedby="emailHelp" value={this.state.name} placeholder="1..." onChange={e => {
              this.setState({
                epic: e.target.value
              })
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Authenticate with Yubikey</label>
            <input type="password" className="form-control" id="yubikey" placeholder="Yubikey OTP" onChange={e => {
              this.setState({
                yubikey: e.target.value
              })
            }} onKeyPress={e => {
              if (e.key === 'Enter') {
                console.log('submit!', this.state)
                this.createNewItem()
              }
            }}/>
            <small id="emailHelp" className="form-text text-muted">Please insert your YubiKey and tap to submit this request.</small>
          </div>

          { this.state.error &&
            <p><span className="badge badge-danger">{this.state.error}</span></p>
          }
        </form>
      </div>
    )
  }
}

export default UpdateLootboxChances;
