import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class ContactFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: ""
          }
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: ""
        }
      },
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate(data) {
    let errors = {};

    if (!data.name) {
      errors.name = "The name should not be empty";
    }

    return errors;
  }

  handleSubmit(e) {
    e.preventDefault();
    let newContact = {
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    };
    newContact.name = this.state.contact.name;
    newContact.username = this.state.contact.username;

    const errors = this.validate(newContact);

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props.addContact(newContact);
    }

    this.setState({
      contact: {
        ...this.state.contact,
        name: "",
        username: ""
      }
    });
  }

  handleChange(e) {
    this.setState({
      contact: {
        ...this.state.contact,
        [e.target.name]: e.target.value
      }
    });

    if (this.props.editedContact) {
      this.props.handleEditContact(this.state.contact);
    }
  }

  render() {
    return (
      <div>
        <h2>Contact From</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.contact.name}
              onChange={this.handleChange}
              className="form-control"
              id="name"
              placeholder="Name"
            />
          </div>
          {this.state.errors.name && (
            <span style={{ color: "red" }}>{this.state.errors.name}</span>
          )}
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              value={this.state.contact.username}
              onChange={this.handleChange}
              className="form-control"
              id="username"
              placeholder="username"
            />
          </div>

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactFrom;
