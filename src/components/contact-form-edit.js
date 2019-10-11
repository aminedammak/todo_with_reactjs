import React, { Component } from "react";

class ContactFromEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { editedContact: props.editedContact };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // let editedContact = { ...this.state.editedContact };
    // editedContact[e.target.name] = e.target.value;
    // this.setState(
    //   {
    //     editedContact
    //   },
    //   () => this.props.handleEditContact(this.state.editedContact)
    // );

    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    this.setState(
      prevState => ({
        editedContact: {
          ...prevState.editedContact,
          [fieldName]: fieldValue
        }
      }),
      () => this.props.handleEditContact(this.state.editedContact)
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmitEditContact(this.props.editedContact);
  }

  render() {
    return (
      <div>
        <h2>Edit contact</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={this.state.editedContact.name}
              placeholder="Name"
              onChange={this.handleChange}
              ref={nameInput => (this.nameInput = nameInput)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              placeholder="username"
              onChange={this.handleChange}
              value={this.state.editedContact.username}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default ContactFromEdit;
