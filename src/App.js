import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      history: [],
      newTodo: '',
      allSelected: false
    }

    this.updateNewTodo  = this.updateNewTodo.bind(this)
    this.addTodo        = this.addTodo.bind(this)
    this.removeSelected = this.removeSelected.bind(this)
    this.toggleAll      = this.toggleAll.bind(this)
    this.undo           = this.undo.bind(this)
  }

  updateNewTodo(event) {
    this.setState({newTodo: event.target.value})
  }

  addTodo(event) {
    event.preventDefault();

    this.setState({
      todos: this.state.todos.concat([
        {
          text: this.state.newTodo,
          checked: false,
          index: this.state.todos.length + 1
        }
      ]),
      newTodo: ''
    })

    this.updateHistory()
  }

  toggleChecked(todoIndex) {
    let newTodos = this.state.todos.map((todo) => {
      if (todo.index === todoIndex) {
        todo.checked = !todo.checked
      }

      return todo
    })

    this.setState({
      todos: newTodos
    })
  }

  checkedCount() {
    return this.state.todos.filter((todo) => todo.checked).length
  }

  updateHistory() {
    this.setState((prevState) => { return {history: this.state.history.concat([prevState.todos])} })
  }

  undo() {
    let history = this.state.history.slice(0, -1)

    this.setState({
      todos: history.length > 0 ? history[history.length - 1] : [],
      history: history
    })
  }

  toggleAll() {
    if (this.state.allSelected) {
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.checked = false;

          return todo
        }),
        allSelected: false
      })
    } else {
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.checked = true;

          return todo
        }),
        allSelected: true
      })
    }
  }

  removeSelected() {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.checked)
    })

    this.updateHistory()
  }

  render() {
    return (
      <div>
        <div className="new-todo">
            <form action="#" onSubmit={this.addTodo}>
                <input type="text" name="new-todo" placeholder="Add new todo..." onChange={this.updateNewTodo} value={this.state.newTodo} />
                <button>Add</button>
            </form>
        </div>

        <div className="todo-list">
            {this.state.todos.map((todo) =>
              <div className="todo-row" key={todo.index}>
                  <input type="checkbox"
                         name={'todo-item-' + todo.index}
                         id={'todo-item-' + todo.index}
                         checked={todo.checked}
                         onClick={() => this.toggleChecked(todo.index)} />

                  <label htmlFor={'todo-item-' + todo.index}>{todo.text}</label>
              </div>
            )}
        </div>

        <div className="todo-actions">
            <button className="action" disabled={this.state.history.length === 0} onClick={this.undo}>Undo</button>
            <button className="action" disabled={this.state.todos.length === 0} onClick={this.toggleAll}>Toggle All</button>
            <button className="action" disabled={this.checkedCount() === 0} onClick={this.removeSelected}>Remove Selected</button>
        </div>
      </div>
    );
  }
}

export default App;
