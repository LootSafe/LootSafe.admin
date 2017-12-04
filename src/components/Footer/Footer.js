import React, {Component} from 'react';
import { apiKey, apiAddr } from '../../config.js'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blockHeight: 1,
      apiHelth: true,
      ethNetHealth: true
    }
  }

  componentWillMount() {
    const getStatus = () => {
      fetch(`${apiAddr}/`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            apiHelth: true,
            ethNetHealth: json.connected
          })
        }).catch(e => {
          this.setState({
            apiHelth: false,
            ethNetHealth: false
          })
        })
    }

    getStatus()
    setInterval(getStatus, 3000)
  }

  render() {
    return (
      <footer className="app-footer">
        <span><a href="http://lootsafe.io">LootSafe Admin</a> &copy; 2017 LootSafe, LLC.</span>
        <span className="ml-auto">
          <small>API Health: 
            { this.state.apiHelth && 
              <span className="badge badge-success">Healthy</span>
            }
            { !this.state.apiHelth &&
              <span className="badge badge-danger">Not Responding</span>
            }
          </small>
          &nbsp;&nbsp;
          <small>RPC Health: 
            { this.state.ethNetHealth && 
              <span className="badge badge-success">Healthy</span>
            }
            { !this.state.ethNetHealth &&
              <span className="badge badge-danger">Not Responding</span>
            }
          </small>
        </span>
      </footer>
    )
  }
}

export default Footer;
