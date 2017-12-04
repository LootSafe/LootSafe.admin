import React, { Component } from 'react';
import { apiKey, apiAddr } from '../../config.js'


class Aside extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: []
    }

    this.renderEvents = this.renderEvents.bind(this)
  }

  componentWillMount() {
    fetch(`${apiAddr}/events`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          console.log('test')
          this.setState({
            events: json.data
          })
        } else {
          this.setState({
            error: json.message || 'Unknown error!'
          })
        }
      })
  }

  renderEvents() {
    return this.state.events.map(event => {
      return (
        <div className="col-sm-12">
          <div className="card card-accent-secondary">
            <div className="card-header">
              {event.event}
            </div>
            <div className="card-body">
              <pre>
                {JSON.stringify(event.args)}
              </pre>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <aside className="aside-menu">
        <div className="container">
          <h3>Events</h3>
        </div>
        <div style={{overflow: 'scroll'}}>
          {this.renderEvents()}
        </div>
      </aside>
    )
  }
}

export default Aside;
