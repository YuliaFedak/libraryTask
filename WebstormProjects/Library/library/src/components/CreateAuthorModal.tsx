import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useCreateAuthorMutation} from "../service/LibraryService";


const CreateAuthorModal = (props: any) => {

    const [createAuthor, {}] = useCreateAuthorMutation()
    const [name, setName] = useState('')
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
            await createAuthor({name})
        } catch (e) {
            console.error("Error creating author:", e);
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
                        <Form.Label>Author full name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button className="create-button" type="submit">Create new author</Button>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    );
};

export default CreateAuthorModal;
