import React, { Component } from "react";
class ContactDetails extends Component {
  constructor(props) {
    super(props);
  }
  getContactsList = contact => {
    if (Object.keys(contact).length > 0) {
      return (
        <div>
          <h2>Contact details</h2>
          <div className="tools">
            <button onClick={e => this.props.edit(contact, e)}>Edit</button>
            <button onClick={this.props.deleteConfirmation.bind(this)}>
              X
            </button>
            <span
              className="delete-confirmation hidden"
              style={{ color: "red" }}
            >
              Sure to delete {contact.name}
              <button onClick={e => this.props.applyDelete(contact, e)}>
                Yes
              </button>
              <button onClick={this.props.refuseDelete.bind(this, contact)}>
                No
              </button>
            </span>
          </div>
          <div>
            <label className="col-md-2"> Name: </label>
            {contact.name}
          </div>
          <div>
            <label className="col-md-2"> Email: </label>
            {contact.email}
          </div>
          <div>
            <label className="col-md-2"> Phone: </label>
            {contact.phone}
          </div>
          <div>
            <label className="col-md-2"> Website: </label>
            {contact.website}
          </div>
          <div>
            <label className="col-md-2"> company: </label>
            {contact.company && contact.company.name}
          </div>
        </div>
      );
    } else {
      return <div>No contact selected</div>;
    }
  };
  render() {
    let contact = {};

    contact = this.props.firstContact;

    return <div>{this.getContactsList(contact)}</div>;
  }
}

export default ContactDetails;
