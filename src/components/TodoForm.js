import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;

	input {
		flex-grow: 1;
		padding: .5em;
	}

	button {
		margin-left: .5em;
		border: none;
		width: 6em;
		height: 2em;
    border: 1px solid transparent;

		&:hover {
			border: 1px solid black;
		}
	}
`;

class TodoForm extends React.Component {
	state = { task: '' };

	handleChange = e => {
		this.setState({ task: e.target.value });
	}

	handleAddClick = e => {
		e.preventDefault();

		if (this.state.task) {
			const item = { task: this.state.task };
			this.props.taskOps.add(item);

			this.setState({ task: '' });
		}
	}

	handleClearClick = e => {
		e.preventDefault();

		this.props.taskOps.clearCompleted();
	}

	render() {
		return (
			<StyledForm>
				<input type="text" value={this.state.task} name="task" onChange={this.handleChange} />
				<button onClick={this.handleAddClick}>Add Task</button>
			</StyledForm>
		);
	}
}

export default TodoForm;