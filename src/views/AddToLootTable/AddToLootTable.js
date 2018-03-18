import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody} from 'reactstrap';
import Web3 from 'web3'
const web3 = new Web3()

class AddToLootTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      rarity: 'common',
      yubikey: '',
      selectedItem: '',
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

  componentWillMount() {
    fetch(`${apiAddr}/item/list`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          this.setState({
            items: json.data,
            selectedItem: web3.utils.toUtf8(json.data[0]),
            selectedRarity: 'common'
          })
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          })
        }
      })
  }

  distributeItem() {
    fetch(`${apiAddr}/item/get/${this.state.selectedItem}`)
      .then(res => res.json())
      .then(itemJson => {
        fetch(`${apiAddr}/lootbox/item/add`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'key': apiKey,
            'otp': this.state.yubikey
          },
          body: JSON.stringify({
            rarity: this.state.selectedRarity,
            item: itemJson.data.address
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
      })
  }

  render() {
    const listItems = this.state.items.map(item => {
      return (
        <option value={web3.utils.toUtf8(item)} key={item}>{web3.utils.toUtf8(item)}</option>
      )
    })
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.selectedItem} Added to loot table</ModalHeader>
          <ModalBody>
            {this.state.selectedItem} has been added to the loot table!
            <p>Tx: <small>{this.state.txid}</small></p>
            <pre>
              {this.state.tx}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
        <h2>Add a {(this.state.selectedItem) ? this.state.selectedItem : 'item' } to the loot box loot table</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Item</label>
            <select className="form-control" onChange={e => {
              this.setState({
                selectedItem: e.target.value
              })
            }} >
              {listItems}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Rarity</label>
            <select className="form-control" onChange={e => {
              this.setState({
                selectedRarity: e.target.value
              })
            }} >
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
            </select>
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
                this.distributeItem()
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

export default AddToLootTable;
