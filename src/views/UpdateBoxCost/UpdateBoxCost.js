import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody} from 'reactstrap';
import Web3 from 'web3'
const web3 = new Web3()

class UpdateBoxCost extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cost: 100,
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

  updateCost() {
    fetch(`${apiAddr}/lootbox/cost/${this.state.cost}`, {
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
          <ModalHeader toggle={this.toggle}>Cost has been updated!</ModalHeader>
          <ModalBody>
            <p>Tx: <small>{this.state.txid}</small></p>
            <pre>
              {this.state.tx}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
        <h2>Update the cost to open a Lootbox</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Lootbox Cost (in wei)</label>
            <input type="number" className="form-control" id="itemName" aria-describedby="emailHelp" value={this.state.name} placeholder="1200..." onChange={e => {
              this.setState({
                cost: e.target.value
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
                this.updateCost()
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

export default UpdateBoxCost;
