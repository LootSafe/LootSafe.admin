import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody} from 'reactstrap';

class NewItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      id: '',
      totalSupply: 100,
      metadata: '',
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
    if (
      this.state.name.length > 1 &&
      this.state.id.length > 1 &&
      this.state.totalSupply > 0 &&
      this.state.yubikey.length > 10
    ) {
      fetch(`${apiAddr}/item/new`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'key': apiKey,
          'otp': this.state.yubikey
        },
        body: JSON.stringify({
          name: this.state.name,
          id: this.state.id,
          totalSupply: this.state.totalSupply,
          metadata: this.state.metadata
        })
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
    } else {
      this.setState({
        error: 'Please ensure you\'ve filled out all required fields. Data missing.'
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.name} Created</ModalHeader>
          <ModalBody>
            {this.state.name} has been created, and deployed to the Ethereum network!
            <p>Tx: <small>{this.state.txid}</small></p>
            <pre>
              {this.state.tx}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
        <h2>Create a new item</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Item Name (up to 8 characters)</label>
            <input type="text" className="form-control" id="itemName" aria-describedby="emailHelp" value={this.state.name} placeholder="Item Name..." onChange={e => {
              if (e.target.value.length < 9) {
                this.setState({
                  name: e.target.value
                })
              }
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Choose Item Id (up to 8 characters)</label>
            <input type="text" className="form-control" id="itemId" aria-describedby="emailHelp" value={this.state.id} placeholder="Item Id..." onChange={e => {
              if (e.target.value.length < 9) {
                this.setState({
                  id: e.target.value
                })
              }
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Please enter the total supply of this item</label>
            <input type="number" className="form-control" id="totalSupply" aria-describedby="emailHelp" value={this.state.totalSupply} placeholder="120000..." onChange={e => {
              this.setState({
                totalSupply: e.target.value
              })
            }} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Metadata (optional)</label>
            <input type="text" className="form-control" id="metadata" aria-describedby="emailHelp" value={this.state.metadata} placeholder="{image: 'http://img.cdn'}..." onChange={e => {
              this.setState({
                metadata: e.target.value
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

export default NewItem;
