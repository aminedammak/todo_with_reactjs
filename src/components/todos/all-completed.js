import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";

class AllCompleted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.allCompleted
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    if (!this.state.checked) this.props.makeAllCompleted();
  };
  render() {
    return (
      <div>
        <Checkbox
          id="all_completed"
          checked={this.state.checked}
          onChange={this.handleChange("checked")}
          value="checked"
          disabled={this.state.checked}
        />
        <label htmlFor="all_completed"> Mark all as completed</label>
      </div>
    );
  }
}

export default AllCompleted;
