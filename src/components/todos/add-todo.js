import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.todoText);
    this.setState({
      todoText: ""
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="outlined-bare"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={this.state.todoText}
          onChange={this.handleChange("todoText")}
        />
      </form>
    );
  }
}

export default withStyles(styles)(AddTodo);
