import React, { Component } from "react";
import Sidebar from "./components/layout/sidebar";
import Content from "./components/layout/content";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Contacts from "./components/contacts";

function onAuthRequired({ history }) {
  history.push("/login");
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filteredContacts: [],
      selectedContact: {},
      contactFetchError: "",
      contactFromVisible: false,
      editedContact: {},
      editMode: false
    };
    // this.updateContactsParentState = this.updateContactsParentState.bind(this);
    this.handleSelectContact = this.handleSelectContact.bind(this);
    this.applyDelete = this.applyDelete.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.edit = this.edit.bind(this);
    this.handleEditContact = this.handleEditContact.bind(this);
    this.handleSubmitEditContact = this.handleSubmitEditContact.bind(this);
  }

  handleSelectContact = selectedContact => {
    this.setState({
      selectedContact,
      contactFromVisible: false,
      editMode: false
    });
  };

  deleteConfirmation(e) {
    e.stopPropagation();
    let allpopups = document.querySelectorAll(".delete-confirmation");
    allpopups.forEach(el => {
      el.style.display = "none";
    });
    e.currentTarget.nextSibling.style.display = "block";
    e.currentTarget.nextSibling;
  }

  applyDelete(contact, e) {
    e.stopPropagation();
    let contacts = [...this.state.contacts];
    contacts = contacts.filter(c => {
      if (c !== contact) return c;
    });
    this.setState({ contacts });

    //if the deleted contact is the selected one, selected area should be blank
    if (this.state.selectedContact === contact) {
      this.setState({ selectedContact: {} });
    }
  }

  refuseDelete(contact, e) {
    e.stopPropagation();
    e.currentTarget.parentElement.style.display = "none";
  }

  //add contact
  handleAddContact() {
    this.setState({
      contactFromVisible: true,
      editMode: false
    });
  }

  addContact(newContact) {
    let contacts = [...this.state.contacts];

    contacts.push(newContact);

    //newContact.id = contacts.length - 1;
    let newContactId = contacts[contacts.length - 2].id + 1;

    newContact.id = newContactId;
    this.setState({
      contacts
    });
  }

  edit(editedContact) {
    this.setState({
      contactFromVisible: false,
      editedContact,
      editMode: true
    });
  }

  handleEditContact(editedContact) {
    let contacts = [...this.state.contacts];
    contacts.map(c => {
      if (c.id === editedContact.id) {
        c.name = editedContact.name;
        c.username = editedContact.username;
      }
    });

    this.setState({
      contacts
    });
  }

  handleSubmitEditContact(editedContact) {
    this.setState({
      contactFromVisible: false,
      editMode: false
    });
  }

  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      //.then(contacts => this.setState({ contacts }))
      .then(contacts => this.setState({ contacts }))
      .then(fetchedContact => this.setFirstContact())
      .catch(error => this.setState({ contactFetchError: error.message }));
  }
  setFirstContact = () => {
    //set default contact
    if (this.state.contacts.length > 0) {
      this.setState({
        selectedContact: this.state.contacts[0]
      });
    }
  };

  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-437774.oktapreview.com/oauth2/default"
          client_id="0oagb7436piPQsGZN0h7"
          redirect_uri={window.location.origin + "/implicit/callback"}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <Sidebar />
                </div>
                <div className="col-md-10">
                  <Content
                    contacts={this.state.contacts}
                    selectedContact={this.state.selectedContact}
                    contactFromVisible={this.state.contactFromVisible}
                    editedContact={this.state.editedContact}
                    editMode={this.state.editMode}
                    handleSelectContact={this.handleSelectContact}
                    deleteConfirmation={this.deleteConfirmation}
                    applyDelete={this.applyDelete}
                    refuseDelete={this.refuseDelete}
                    handleAddContact={this.handleAddContact}
                    addContact={this.addContact}
                    edit={this.edit}
                    handleEditContact={this.handleEditContact}
                    handleSubmitEditContact={this.handleSubmitEditContact}
                    filteredContacts={this.state.filteredContacts}
                  />
                </div>
              </div>
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
