import React, {useState} from 'react';
import {useCreateBookMutation} from "../service/LibraryService";
import {Button, Form, Modal} from "react-bootstrap";

const CreateBookModal = (props : any) => {

    const [createBook, {}] = useCreateBookMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [authorName, setAuthorName] = useState('')

    const [validated, setValidated] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(false);

        try {
            await createBook({title, description, authorName})
        } catch (e) {
            console.error("Error creating book:", e);
        }

        props.onHide();
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create author
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title of book:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Author of book:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={authorName}
                            onChange={e => setAuthorName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button className="create-button" type="submit">Create new book</Button>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateBookModal;
