import React, { Component } from "react";
import ContactDetails from "./contact-details";
import ContactFrom from "./contact-from";
import ContactFromEdit from "./contact-form-edit";
import ContactsSearch from "./contacts-search";
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.handleSelectContact = this.handleSelectContact.bind(this);
    this.deleteConfirmation = this.deleteConfirmation.bind(this);
    this.applyDelete = this.applyDelete.bind(this);
    this.refuseDelete = this.refuseDelete.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.edit = this.edit.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
    this.handleSubmitEditContact = this.handleSubmitEditContact.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchText: ""
    };
  }

  handleSelectContact = selectedContact => {
    this.props.handleSelectContact(selectedContact);
  };

  deleteConfirmation(e) {
    this.props.deleteConfirmation(e);
  }

  applyDelete(contact, e) {
    this.props.applyDelete(contact, e);
  }

  refuseDelete(contact, e) {
    this.props.refuseDelete(contact, e);
  }

  //add contact
  handleAddContact() {
    this.props.handleAddContact();
  }

  addContact(newContact) {
    this.props.addContact(newContact);
  }

  edit(editedContact) {
    this.props.edit(editedContact);
  }

  handleEditContact(editedContact) {
    this.props.handleEditContact(editedContact);
  }

  handleSubmitEditContact(editedContact) {
    this.props.handleSubmitEditContact(editedContact);
  }

  handleSearch(searchText) {
    // let oldContacts = [...this.state.contacts];
    // let pattern = new RegExp("/" + searchText + "/i");

    // oldContacts = oldContacts.filter(contact => {
    //   return pattern.test(contact.name);
    // });

    // this.setState({
    //   filteredContacts: oldContacts
    // });
    this.setState({ searchText });
  }

  showClientsList = contacts => {
    if (Object.keys(contacts).length) {
      if (this.state.searchText) {
        contacts = contacts.filter(contact => {
          if (contact.name.indexOf(this.state.searchText) !== -1) {
            return contact;
          }
        });
      }
      return (
        <ul className="list contacts">
          {contacts.map(contact => (
            <li
              onClick={() => this.handleSelectContact(contact)}
              key={contact.id}
            >
              {contact.name}
              <span
                className="icon-delete"
                onClick={this.deleteConfirmation.bind(this)}
              >
                X
              </span>
              <span
                className="delete-confirmation hidden"
                style={{ color: "red" }}
              >
                Sure to delete {contact.name}
                <button onClick={e => this.applyDelete(contact, e)}>Yes</button>
                <button onClick={this.refuseDelete.bind(this, contact)}>
                  No
                </button>
              </span>
            </li>
          ))}
        </ul>
      );
    } else {
      return <div>the are no clients</div>;
    }
  };

  render() {
    const contacts = this.props.contacts;
    const selectedContact = this.props.selectedContact;
    return (
      <div className="row">
        <div className="col-md-4">
          <h2>List of Contacts</h2>
          <ContactsSearch handleSearch={this.handleSearch} />
          {this.showClientsList(contacts)}
        </div>
        <div className="col-md-8">
          <button style={{ float: "right" }} onClick={this.handleAddContact}>
            Add new contact
          </button>
          {!(this.props.contactFromVisible || this.props.editMode) && (
            <ContactDetails
              edit={this.edit}
              applyDelete={this.applyDelete}
              refuseDelete={this.refuseDelete}
              deleteConfirmation={this.deleteConfirmation}
              firstContact={selectedContact}
              contact={selectedContact}
              handleAddContact={this.handleAddContact}
            />
          )}
          {this.props.contactFromVisible && (
            <ContactFrom
              editedContact={this.props.editedContact}
              handleEditContact={this.handleEditContact}
              handleAddContact={this.handleAddContact}
              addContact={this.addContact}
              edit={this.edit}
            />
          )}
          {this.props.editMode && (
            <ContactFromEdit
              editedContact={this.props.editedContact}
              handleEditContact={this.handleEditContact}
              edit={this.edit}
              handleSubmitEditContact={this.handleSubmitEditContact}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Contacts;
