import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import styled from 'styled-components';

const sampleList = [
  {
    id: Date.now(),
    task: "Open the Todo List",
    completed: true
  },
  {
    id: Date.now() - 50,
    task: "Try adding a new item",
    completed: false,
  },
  {
    id: Date.now() - 100,
    task: "Try marking an item as complete",
    completed: false
  },
  {
    id: Date.now() - 200,
    task: "Try reordering items",
    completed: false
  },
  {
    id: Date.now() - 300,
    task: "Try deleting an item",
    completed: false
  },
  {
    id: Date.now() - 400,
    task: "Try clearing all completed items",
    completed: false
  },
];

const AppContainer = styled.div`
  margin: auto;
  width: 30em;
  border: 1px solid white;
  background-color: #fffada;

  &>button {
		margin: .5em;
		border: none;
    padding: .5em;
    border: 1px solid transparent;

		&:hover {
			border: 1px solid black;
		}
  }

  h2 {
    margin: .5em;
  }
`;

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(props) {
    super(props);

    this.state = {
      todoData: [],
      autoSave: false
    };
  }

  componentDidMount() {
    const autoSave = localStorage.getItem('autoSave');
    const savedList = localStorage.getItem('todoList');
    //debugger;
    if (autoSave === "true" && savedList) {
      const todoData = JSON.parse(savedList);
      this.setState({ todoData: todoData, autoSave: true });
    }

    else {
      this.setState({ todoData: sampleList, autoSave: false });
    }
  }

  componentDidUpdate() {
    if (this.state.autoSave) {
      this.saveList();
    }
  }

  taskOps = {
    add: item => {
      item.id = Date.now();
      item.completed = false;

      this.setState({ todoData: [...this.state.todoData, item] });
    },

    toggle: taskId => {
      const newData = this.state.todoData.map(t => {
        if (t.id === taskId)
          return { ...t, completed: !t.completed };
        else
          return t;
      });

      this.setState({ todoData: newData });
    },

    reorder: (taskId, dir) => {
      const length = this.state.todoData.length;
      const orignalIndex = this.state.todoData.findIndex(t => t.id === taskId);
      const newIndex = orignalIndex - dir;

      if (newIndex >= 0 && newIndex < length) {
        const newData = [...this.state.todoData];
        const item = newData[orignalIndex];
        newData[orignalIndex] = newData[newIndex];
        newData[newIndex] = item;

        this.setState({ todoData: newData });
      }
    },

    remove: taskId => {
      const newData = this.state.todoData.filter(t => t.id !== taskId);
      this.setState({ todoData: newData })
    },

    clearCompleted: () => {
      this.setState({ todoData: this.state.todoData.filter(t => !t.completed) });
    },
  };

  handleAutoSaveChange = e => {
    const value = e.target.checked;
    this.setState({ autoSave: value });

    if (value) {
      this.saveList();
    }
    else {
      localStorage.setItem('autoSave', "false");
      localStorage.removeItem('todoList');
    }
  }

  saveList() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoData));
    localStorage.setItem('autoSave', "true");
  }

  render() {
    return (
      <AppContainer>
        <h2>Todo</h2>
        <TodoList data={this.state.todoData} taskOps={this.taskOps} />
        {/* <TodoForm taskOps={this.taskOps} /> */}
        <button onClick={this.taskOps.clearCompleted}>Clear completed</button>
        <label>
          <input type="checkbox" checked={this.state.autoSave} onChange={this.handleAutoSaveChange} />
          <span>Auto-save</span>
        </label>
      </AppContainer>
    );
  }
}

export default App;
