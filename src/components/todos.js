import React, { Component } from "react";
import Todo from "./todos/Todo";
import TodosFilter from "./todos/todos-filter";
import AddTodo from "./todos/add-todo";
import AllCompleted from "./todos/all-completed";

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false
  }
];

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todos,
      filter: 0,
      allCompleted: false
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.manageCompleted = this.manageCompleted.bind(this);
    this.filter = this.filter.bind(this);
  }
  deleteTodo(todoToDelete) {
    let newTodos = [...this.state.todos];
    newTodos = newTodos.filter(todo => {
      if (todo !== todoToDelete) {
        return todo;
      }
    });
    this.setState({ todos: newTodos });
  }
  manageCompleted(checkedTodo) {
    let newTodos = [...this.state.todos];
    newTodos = newTodos.map(todo => {
      if (todo === checkedTodo) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: newTodos }, () => this.checkAllCompleted());
  }
  filter(index) {
    this.setState({ filter: index });
  }
  addTodo = todotext => {
    //create a todo object
    //genereate new id
    let newId = this.state.todos.length + 1;
    let newTodo = {
      userId: 1,
      id: newId,
      title: todotext,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  editTodo = editedTodo => {};

  applyEdit = (editedTodo, editedText) => {
    let todoList = [...this.state.todos];
    todoList = todoList.map(todo => {
      if (todo.id === editedTodo.id) {
        todo.title = editedText;
      }
      return todo;
    });
    this.setState({
      todo: todoList
    });
  };

  makeAllCompleted = () => {
    let newTodos = [...this.state.todos];
    newTodos = newTodos.map(todo => {
      todo.completed = true;
      return todo;
    });
    this.setState({ todos: newTodos, allCompleted: true });
  };

  checkAllCompleted = () => {
    console.log("checking ...");
    let newTodos = [...this.state.todos];
    let completedTodo = newTodos.find(todo => {
      if (!todo.completed) {
        return todo;
      }
    });
    if (!completedTodo) {
      this.setState({ allCompleted: true });
    } else {
      this.setState({ allCompleted: false });
    }
  };

  showTodos(todos) {
    if (todos.length > 0) {
      //show todos

      //apply filter
      if (this.state.filter === 0) {
        let tododprint = todos.map(todo => {
          return (
            <Todo
              key={todo.id}
              deleteTodo={this.deleteTodo}
              editTodo={this.editTodo}
              applyEdit={this.applyEdit}
              manageCompleted={this.manageCompleted}
              todo={todo}
            />
          );
        });
        return tododprint;
      } else if (this.state.filter === 1) {
        let totalCompleted = 0;
        let tododprint = todos.map(todo => {
          if (!todo.completed) {
            totalCompleted++;
            return (
              <Todo
                key={todo.id}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                applyEdit={this.applyEdit}
                manageCompleted={this.manageCompleted}
                todo={todo}
              />
            );
          }
        });
        if (totalCompleted > 0) {
          return tododprint;
        } else {
          return "NO TODO FOUND";
        }
      } else if (this.state.filter === 2) {
        let totalCompleted = 0;
        let tododprint = todos.map(todo => {
          if (todo.completed) {
            totalCompleted++;
            return (
              <Todo
                key={todo.id}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                applyEdit={this.applyEdit}
                manageCompleted={this.manageCompleted}
                todo={todo}
              />
            );
          }
        });
        if (totalCompleted > 0) {
          return tododprint;
        } else {
          return "NO TODO FOUND";
        }
      }
    } else {
      return "NO TODO FOUND";
    }
  }
  render() {
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodosFilter filter={this.filter} />
        {this.showTodos(this.state.todos)}
        <AllCompleted
          makeAllCompleted={this.makeAllCompleted}
          allCompleted={this.state.allCompleted}
        />
      </div>
    );
  }
}

export default Todos;
