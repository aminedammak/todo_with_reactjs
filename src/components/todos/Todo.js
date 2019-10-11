import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import EditTodo from "./edit-todo";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.todo.completed,
      edited: false
    };
  }

  handleDelete(todo) {
    //Call delete todo
    this.props.deleteTodo(todo);
  }

  handleEdit(todo) {
    this.setState({
      edited: true
    });
    this.props.editTodo(todo);
  }

  handleChange = (name, todo) => event => {
    this.setState({ [name]: event.target.checked });
    this.props.manageCompleted(todo);
  };
  applyEdit = (editedTodo, editedText) => {
    this.props.applyEdit(editedTodo, editedText);
    this.setState({
      edited: false
    });
  };
  render() {
    return (
      <div>
        <Paper elevation={1} style={{ padding: "20px", margin: 20 }}>
          <Typography component="p">
            <Checkbox
              checked={this.state.checked}
              onChange={this.handleChange("checked", this.props.todo)}
              value="checked"
            />

            {!this.state.edited && this.props.todo.title}
            {this.state.edited && (
              <EditTodo todo={this.props.todo} applyEdit={this.applyEdit} />
            )}
            <ClearIcon
              onClick={() => this.handleDelete(this.props.todo)}
              style={{ float: "right" }}
              color="primary"
            />
            {!this.state.edited && (
              <EditIcon
                onClick={() => this.handleEdit(this.props.todo)}
                style={{ float: "right" }}
              />
            )}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Todo;
