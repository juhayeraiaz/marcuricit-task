import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Form,
} from "react-bootstrap";
import { toast } from "react-toastify";

const BasicInputElements = () => {
    const [validated, setValidated] = useState(false);
    const [formDataList, setFormDataList] = useState([]);
    const [uniqueID, setUniqueID] = useState();

    const getUniqueID = () => {
        setUniqueID(Date.now() + ((Math.random() * 100000).toFixed()));
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            const formData = {
                name: form.elements.name.value,
                email: form.elements['example-email'].value,
                password: form.elements['example-password'].value,
                company: form.elements['example-company'].value,
                textarea: form.elements['example-textarea'].value,
                select: form.elements.select.value,
                fileinput: form.elements['example-fileinput'].value,
                date: form.elements.date.value,
                month: form.elements.month.value,
                time: form.elements.time.value,
                week: form.elements.week.value,
                age: form.elements.age.value,
                url: form.elements.url.value,
                search: form.elements.search.value,
                phonenumber: form.elements.phonenumber.value,
                color: form.elements.color.value,
                range: form.elements.range.value,
                id: uniqueID,
            };
            setFormDataList([...formDataList, formData]);
            localStorage.setItem('formDataList', JSON.stringify([...formDataList, formData]));
            toast.success("Data received");
        }
        setValidated(true);
    };
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0">Input Types</h4>
                <p className="sub-header">
                    Most common form control, text-based input fields. Includes support
                    for all HTML5 types: <code>text</code>, <code>password</code>,{" "}
                    <code>datetime</code>, <code>datetime-local</code>, <code>date</code>,{" "}
                    <code>month</code>, <code>time</code>, <code>week</code>,{" "}
                    <code>number</code>, <code>email</code>, <code>url</code>,{" "}
                    <code>search</code>, <code>tel</code>, and <code>color</code>.
                </p>

                <Form noValidate validated={validated} onSubmit={handleSubmit} onClick={getUniqueID} className="form-horizontal">
                    <Row>
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3" controlId="name">
                                <Form.Label column lg={2}>Name</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" required placeholder="Enter Your Full name" />
                                    <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="example-email">
                                <Form.Label column lg={2}>Email</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="email" required placeholder="Email" />
                                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="example-password">
                                <Form.Label column lg={2}>Password</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="password" required defaultValue="password" />
                                    <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-company">
                                <Form.Label column lg={2}>Company</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" required placeholder="Enter Company name" />
                                    <Form.Control.Feedback type="invalid">Please enter a Company name.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="example-textarea">
                                <Form.Label column lg={2}>Text area</Form.Label>
                                <Col lg={10}>
                                    <Form.Control as="textarea" required rows={5} />
                                    <Form.Control.Feedback type="invalid">Please enter some text.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column lg={2}>Readonly</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" readOnly value="Readonly value" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column lg={2}>Disabled</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" disabled value="Disabled value" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column lg={2} htmlFor="example-static">
                                    Static control
                                </Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" readOnly plaintext value="email@example.com" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="example-helping">
                                <Form.Label column lg={2}>Helping text</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="text" required placeholder="Helping text" />
                                    <Form.Control.Feedback type="invalid">Please enter a value.</Form.Control.Feedback>
                                    <span className="help-block">
                                        <small>A block of help text that breaks onto a new line and may extend beyond one line.</small>
                                    </span>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="select">
                                <Form.Label column lg={2}>Input Select</Form.Label>
                                <Col lg={10}>
                                    <Form.Select required>
                                        <option value="">Select an option</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Please select an option.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group as={Row} className="mb-3" controlId="example-fileinput">
                                <Form.Label column lg={2}>Default file input</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="file" required />
                                    <Form.Control.Feedback type="invalid">Please select a file.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-date">
                                <Form.Label column lg={2}>Date</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="date" required name="date" />
                                    <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-month">
                                <Form.Label column lg={2}>Month</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="month" required name="month" />
                                    <Form.Control.Feedback type="invalid">Please enter a month.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-time">
                                <Form.Label column lg={2}>Time</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="time" required name="time" />
                                    <Form.Control.Feedback type="invalid">Please enter a time.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-week">
                                <Form.Label column lg={2}>Week</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="week" required name="week" />
                                    <Form.Control.Feedback type="invalid">Please enter a week.</Form.Control.Feedback>
                                </Col >
                            </Form.Group >
                            <Form.Group as={Row} className="mb-3" controlId="example-age">
                                <Form.Label column lg={2}>Age</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="number" required name="age" />
                                    <Form.Control.Feedback type="invalid">Please enter your age.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="url">
                                <Form.Label column lg={2}>URL</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="url" required name="url" />
                                    <Form.Control.Feedback type="invalid">Please enter a valid URL.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="search">
                                <Form.Label column lg={2}>Search</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="search" required name="search" />
                                    <Form.Control.Feedback type="invalid">Please enter a search term.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="phonenumber">
                                <Form.Label column lg={2}>Phone Number</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="tel" required name="phonenumber" />
                                    <Form.Control.Feedback type="invalid">Please enter a valid telephone number.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="example-color">
                                <Form.Label column lg={2}>Color</Form.Label>
                                <Col lg={10}>
                                    <Form.Control type="color" required name="color" className="w-100" defaultValue="#5369f8" />
                                    <Form.Control.Feedback type="invalid">Please select a color.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-0" controlId="example-range">
                                <Form.Label column lg={2}>Range</Form.Label>
                                <Col lg={10}>
                                    <Form.Range className="mt-1" required name="range" />
                                    <Form.Control.Feedback type="invalid">Please select a value from the range.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <button className="btn-primary btn" type="submit">Submit</button>
                </Form>
            </Card.Body>
        </Card>
    );
};
const CreateForm = () => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <BasicInputElements />
                </Col>
            </Row>
        </>
    );
};
export default CreateForm;
