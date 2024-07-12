import React from 'react';
import {Button, Container, Row, Col, Card, DropdownButton, Dropdown} from "react-bootstrap";
import {useDeleteBookMutation, useDeleteAuthorMutation, useFetchAllAuthorsQuery, useExportBooksMutation} from "../service/LibraryService";
import CreateAuthorModal from "../components/CreateAuthorModal";
import {IAuthors} from "../models/IAuthors";
import CreateBookModal from "../components/CreateBookModal";
import {IBooks} from "../models/IBooks";
import UpdateBookModal from "../components/UpdateBookModal";

const Library = () => {

    const { data: items } = useFetchAllAuthorsQuery()
    const [modalShow, setModalShow] = React.useState(false)
    const [modal, setModal] = React.useState(false)
    const [modalUpdateShow, setModalUpdateShow] = React.useState(false)
    const [deleteAuthor, {}] = useDeleteAuthorMutation()
    const [deleteBook, {}] = useDeleteBookMutation()
    const [selectedBook, setSelectedBook] = React.useState<IBooks | null>(null)
    const [selectedAuthor, setSelectedAuthor] = React.useState('')

    const [exportBooks] = useExportBooksMutation()

    const handleExport = async () => {
        const { data, error } = await exportBooks();

        if (error) {
            console.error("Error exporting books:", error);
            return; // Optionally handle the error (e.g., show a notification)
        }

        if (data) {
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute("download", "books.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    const handleRemove = (author: IAuthors) => {
        deleteAuthor(author)
    }

    const handleRemoveBook = (book1: IBooks) => {
        deleteBook(book1)
    }

    const handleSelectList = (item: IBooks, aut: string) => {
        setSelectedBook(item);
        setSelectedAuthor(aut)
        setModalUpdateShow(true);

    };

    return (
        <Container className='mt-4'>

            <div className='d-flex justify-content-between'>
                <h2>My library</h2>
                <div>
                    <Button className="me-4" onClick={() => handleExport()}>Export library</Button>
                    <Button className="me-4" onClick={() => setModalShow(true)}>Add author</Button>

                    <CreateAuthorModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <Button onClick={() => setModal(true)}>Add book</Button>

                    <CreateBookModal
                        show={modal}
                        onHide={() => setModal(false)}
                    />
                </div>
            </div>
            <Row>
                {items && items.map(item => (
                    <Col md={3}  style={{marginTop: 25}}>
                        <td key={item.id} >
                            <div className="d-flex justify-content-between align-content-center" style={{marginTop: 5}}>
                                Author: {item.name}
                                <Button variant="danger" className="mx-3" onClick={() => handleRemove(item)}>Delete</Button>
                            </div>
                        </td>
                        {item.books && item.books.map( book =>
                            <Card style={{marginTop: 15}}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-content-center">
                                        <Card.Title>{book.title}</Card.Title>
                                        <DropdownButton variant="warning" className="menu-btn" title="tools">
                                            <Dropdown.Item eventKey="1"><Button variant="warning" onClick={() => handleSelectList(book, item.name)}> Edit</Button></Dropdown.Item>
                                            <Dropdown.Item eventKey="2" onClick={() => handleRemoveBook(book)}><Button variant="warning">Delete</Button></Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                    <Card.Text>
                                        {book.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                ))}
            </Row>
            {selectedBook && (
                <UpdateBookModal
                    book={selectedBook}
                    author={selectedAuthor}
                    show={modalUpdateShow}
                    onHide={() => setModalUpdateShow(false)}
                />
            )}

        </Container>
    );
};

export default Library;
