import React, { Component } from "react";

class ContactsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        searchText: e.target.value
      },
      () => this.props.handleSearch(this.state.searchText)
    );
  }
  render() {
    return (
      <div>
        <h3>Search</h3>
        <input
          type="text"
          value={this.state.searchText}
          onChange={this.handleChange}
          placeholder="Search"
        />
      </div>
    );
  }
}

export default ContactsSearch;
