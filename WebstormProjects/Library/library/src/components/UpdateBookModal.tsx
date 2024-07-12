import React, {useState} from 'react';
import {useCreateBookMutation, useUpdateBookMutation} from "../service/LibraryService";
import {Button, Form, Modal} from "react-bootstrap";
import {IBooks} from "../models/IBooks";


const UpdateBookModal = ({ book, author, show, onHide }: {book: IBooks, author :string, show: boolean, onHide: () => void}) => {

    const [updateBook, {}] = useUpdateBookMutation()
    const [title, setTitle] = useState( book.title);
    const [description, setDescription] = useState(book.description)
    const [authorName, setAuthorName] = React.useState(author)
    const id =book.id

    const [validated, setValidated] = useState(false)
    console.log(title)


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
            await updateBook({ id, title, description, authorName})
        } catch (e) {
            console.error("Error creating book:", e);
        }

        onHide();
    };
    return (
        <Modal
            show={show}
            onHide={onHide}
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
                            type="textarea"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button className="create-button" type="submit">Update book</Button>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateBookModal;
