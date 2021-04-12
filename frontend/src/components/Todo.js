import React, { useState } from 'react'
import { Row, Col, Form, Button, Modal } from 'react-bootstrap'

const Todo = ({ id, title, description, completeTodo, editTodo, deleteTodo }) => {
    const [show, setShow] = useState(false);

    const [newTitle, setTitle] = useState(title)
	const [newDescription, setDescription] = useState(description)

    const handleClose = () => {
    	setShow(false);
    	setTitle(title)
    	setDescription(description)
    }
    
    const handleShow = () => setShow(true);

    const editTodoHandler = (title, description) => {
    	handleClose()
    	const todo = {
    		id,
    		title,
    		description,
    	}

    	editTodo(todo)

    	setTitle(title)
    	setDescription(description)
    }

	return (
		<>
		  <Row className='border-bottom pt-3'>
		    <Col md={1}>
		    <Form>
		      <Form.Check
		        type='checkbox'
		        onChange={() => completeTodo(id)}
		      />
		    </Form>
		    </Col>

		    <Col>
		      <h5>{title}</h5>
		      <p>{description}</p>
		    </Col>

		    <Col md={2}>
		      <Form>
		        <Button variant='info' className='my-2 btn-block' onClick={handleShow}>Edit</Button>
		      </Form>

		      <Form>
		        <Button variant='danger' className='my-2 btn-block' onClick={() => deleteTodo(id)}>Delete</Button>
		      </Form>
		    </Col>
		  </Row>

		  <Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Edit Todo</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form>
					<Form.Group controlId='title'>
					  <Form.Label>Title</Form.Label>
					  <Form.Control type='text' value={newTitle} onChange={e => setTitle(e.target.value)} />
					</Form.Group>

					<Form.Group controlId='description'>
					  <Form.Label>Description</Form.Label>
					  <Form.Control type='text' value={newDescription} onChange={e => setDescription(e.target.value)} />
					</Form.Group>
				</Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={() => editTodoHandler(newTitle, newDescription)}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
	      </Modal>
		</>
	)
}

export default Todo