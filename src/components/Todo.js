import React from 'react';
import styled from 'styled-components';

const StyledTask = styled.li`

`;

class Todo extends React.Component {
	render() {
		const { todo, taskOps } = this.props;
		const { task, completed, id } = todo;

		return (
			<StyledTask className="todo-item">
				<span onClick={() => taskOps.toggle(id)} className={completed ? "complete" : ""}>{task}</span>
				<button onClick={() => taskOps.reorder(id, 1)}>+</button>
				<button onClick={() => taskOps.reorder(id, -1)}>-</button>
				<button onClick={() => taskOps.remove(id)}>x</button>
			</StyledTask>
		);
	}
}

export default Todo;