import React, {Component} from 'react';

class Yubikey extends Component {
  render() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Please authenticate with your Yubikey</h4>
            </div>
            <div className="modal-body">
              <p>Tap your Yubikey to authenticate this request.</p>
              <div className="form-group">
                <input type="password" className="form-control" id="yubikeyotp" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Yubikey;
