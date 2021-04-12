import React, { useState, useEffect } from 'react'

import './App.css';
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'

function App() {
	const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const response = await axios.get('/api/v1/todo/')
			const { data } = response
			setTodos(data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	const addTodo = async newTodo => {
		try {
			console.log(newTodo)
			await axios.post('/api/v1/todo/', newTodo)
			getTodos()
		} catch (err) {
			console.log(err)
		}
	}

	const completeTodo = async id => {
		try {
			const todo = todos.filter(todo => todo.id === id)[0]
			todo.completed = true
			await axios.put(`/api/v1/todo/${id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const editTodo = async todo => {
		try {
			await axios.put(`/api/v1/todo/${todo.id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const deleteTodo = async id => {
		try {
			await axios.delete(`/api/v1/todo/${id}/`)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div className='wrapper'>
		<Container>
		  <Row className='justify-content-center pt-5'>
		    <Col>
		      <Card className='p-5'>
					  <h3>My Todos</h3>
					  <AddTodo addTodo={addTodo} />
					  {todos.map((todo, index) => (
					  	!todo.completed && <Todo key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
					  ))}
					</Card>
				</Col>
			</Row>
		</Container>
		</div>
	);
}

export default App;
