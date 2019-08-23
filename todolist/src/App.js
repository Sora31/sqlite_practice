import React, { Component } from 'react';
import TodoListTemplete from './components/TodoListTemplete'
import TodoItemList from './components/TodoItemList'
import Form from './components/Form';
import Palette from './components/Palette'
import { getList, postList } from './api/list'

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6']

class App extends Component {

  state ={
    input: '',
    todos:[]
  }

  async componentDidMount() {
    const todos = await getList()
    console.log('todos', todos)
    this.setState({todos})
          //   console.log(res)
    //   const todos = res.data
    //   state.setState({todos})
    //   console.l0og(this.state)
    // })
    // console.log('hello ', todos)
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleCreate = (e) => {
    const { input, todos } = this.state
    postList(todos)
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id,
        text: input,
        checked: false,
        color: color,
      })
    })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate()
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state

    const index = todos.findIndex(todo => todo.id === id)
    const selected = todos[index]

    const nextTodos = [...todos]

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    }

    this.setState({
      todos: nextTodos
    })
  }

  handleRemove = (id) => {
    const { todos } = this.state
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  render() {
    const { input, todos, color } = this.state
    const {
      handleChange,
      handleKeyPress,
      handleCreate,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this

    return (
      <TodoListTemplete form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
        />
      )}
        palette={(
          <Palette colors={colors} selected={color} onSelect={handleSelectColor} />
        )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} color={color} />
      </TodoListTemplete>
    )
  }
}

export default App
