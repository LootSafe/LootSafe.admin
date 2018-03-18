import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody} from 'reactstrap';
import Web3 from 'web3'
const web3 = new Web3()

class DistributeItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      recipient: '',
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
            selectedItem: web3.utils.toUtf8(json.data[0])
          })
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          })
        }
      })
  }

  

  distributeItem() {
    fetch(`${apiAddr}/item/ledger`)
      .then(res => res.json())
      .then(json => {
        const item = json.data.filter(i => i._parsed.name === this.state.selectedItem )[0]
        fetch(`${apiAddr}/item/spawn`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'key': apiKey,
            'otp': this.state.yubikey
          },
          body: JSON.stringify({
            itemAddress: item.address,
            to: this.state.recipient
          })
        })
          .then(res => res.json())
          .then(json2 => {
            if (json2.status === 200) {
              this.setState({
                txid: json2.data.tx,
                tx: JSON.stringify(json2.data.receipt),
                modal: true
              })
            } else {
              this.setState({
                error: json2.message || 'Unknown error!'
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
          <ModalHeader toggle={this.toggle}>{this.state.selectedItem} Distributed</ModalHeader>
          <ModalBody>
            {this.state.selectedItem} has been distributed to {this.state.recipient}!
            <p>Tx: <small>{this.state.txid}</small></p>
            <pre>
              {this.state.tx}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
          </ModalFooter>
        </Modal>
        <h2>Distribute an {(this.state.selectedItem) ? this.state.selectedItem : 'item' }</h2>
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
            <label htmlFor="exampleInputEmail1">Recipient (please paste address)</label>
            <input type="text" className="form-control" id="recipient" aria-describedby="emailHelp" value={this.state.recipient} placeholder="Recipient Address..." onChange={e => {
              if (web3.utils.isAddress(e.target.value)) {
                this.setState({
                  recipient: e.target.value
                })
              }
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

export default DistributeItem;
