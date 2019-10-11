import React, { Component } from "react";
import Header from "./header";
import Contacts from "../contacts";
import Todos from "../todos";
import Dashboard from "../dashboard";
import Login from "../Login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";

const Content = props => {
  return (
    <div>
      <Header />
      <h2>Content</h2>

      <Route exact path="/" component={Dashboard} />
      <SecureRoute
        exact
        path="/contacts"
        render={() => (
          <Contacts
            contacts={props.contacts}
            selectedContact={props.selectedContact}
            updateContactsParentState={props.updateContactsParentState}
            contactFromVisible={props.contactFromVisible}
            editedContact={props.editedContact}
            editMode={props.editMode}
            handleSelectContact={props.handleSelectContact}
            deleteConfirmation={props.deleteConfirmation}
            applyDelete={props.applyDelete}
            refuseDelete={props.refuseDelete}
            handleAddContact={props.handleAddContact}
            addContact={props.addContact}
            edit={props.edit}
            handleEditContact={props.handleEditContact}
            handleSubmitEditContact={props.handleSubmitEditContact}
            filteredContacts={props.filteredContacts}
          />
        )}
      />
      <Route
        path="/login"
        render={() => <Login baseUrl="https://dev-437774.oktapreview.com" />}
      />
      <Route path="/implicit/callback" component={ImplicitCallback} />
      <Route exact path="/todos" component={Todos} />
    </div>
  );
};

export default Content;
