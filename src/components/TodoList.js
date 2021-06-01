import React from 'react';
import styled from 'styled-components';
import Todo from './Todo';
import TodoForm from './TodoForm';

const StyledUl = styled.ul`
	padding-inline-start: 0px;

	border-color: #0000FF99;
	border-width: 2px 0px 0px;
	border-style: solid;

	li {
		color: black;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		border-color: #0000FF99;
		border-width: 0px 0px 2px;
		border-style: solid;
		padding: .5em;
	}

	.todo-item {
		font-weight: 400;

		&:hover {
			background-color: #FFFF9977;

			span {
				/* color: #555555; */
			}

			button {
				/* display: inline; */
				opacity: 60%;
			}
		}

		span {
			text-decoration: none;
			flex-grow: 1;
			text-align: left;
		}

		.complete {
			text-decoration: line-through;
		}

		button {
			/* display: none; */
			border: none;
			margin: 2px;
			width: 2em;
			height: 2em;
			opacity: 0%;
			border: 1px solid transparent;

			&:hover {
				border: 1px black solid;
				opacity: 100%;
			}
		}
	}
`;

class TodoList extends React.Component {
	render() {
		const { data, taskOps } = this.props;

		return (
			<StyledUl>
				{data.map(td => {
					return (

							<Todo key={td.id} todo={td} taskOps={taskOps} />

					);
				})}
				<li><TodoForm taskOps={taskOps}/></li>
			</StyledUl>
		);
	}
}

export default TodoList;