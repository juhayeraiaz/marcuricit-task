import React, { useCallback, useState } from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const Home = () => {
    const [visible, setVisible] = useState(true);
    const toggleVisible = useCallback(() => {
        setVisible(visible => !visible);
    }, []);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpentask, setIsDropdownOpentask] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    const toggleDropdowntask = () => {
        setIsDropdownOpentask(!isDropdownOpentask);
    };
    const closeDropdowntask = () => {
        setIsDropdownOpentask(false);
    };

    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        toast.success("Logged out successfully")
    };

    return (
        <div className="bg-light">
            <Container fluid>
                <Row className='m-0'>
                    {visible ? (
                        <Col sm={0} md={3} lg={3} xl={2} xxl={2} className="d-flex flex-column justify-content-between border-end vh-100 py-3 px-4">
                            <div>
                                <Navbar.Brand href="#">
                                    <Image src="images/logo.svg" width={128} alt="" />
                                </Navbar.Brand>
                                <div className="mt-4 text-center">
                                    <Image
                                        src={user?.photoURL}
                                        rounded
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                    <h5 className="mt-2 mb-0">{user?.displayName}</h5>
                                    <small className="text-muted">Admin</small>
                                </div>
                                <Nav className="mt-4 flex-column">
                                    <Nav.Link as={Link} to="/" className="bg-gradient rounded-pill mb-2 px-3 py-2" active>
                                        <i className="fas fa-th me-2"></i>
                                        Dashboard
                                    </Nav.Link>
                                    <Nav.Link href="#" id="profile" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-user-circle me-2"></i>
                                        Profile
                                    </Nav.Link>
                                    <Nav.Link href="#" id="groups" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-layer-group me-2"></i>
                                        Invoices
                                    </Nav.Link>
                                    <Nav.Link href="#" id="reports" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-flag me-2"></i>
                                        Reports
                                    </Nav.Link>
                                    <Nav.Link href="#" id="branches" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-map-marked-alt me-2"></i>
                                        Branches
                                    </Nav.Link>
                                    <Nav.Link href="#" id="tests" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-flask me-2"></i>
                                        Tests
                                    </Nav.Link>
                                    <NavDropdown
                                        title={
                                            <>
                                                <i className="fa-regular fa-star me-2"></i>
                                                Tasks
                                            </>
                                        }
                                        id="tasks"
                                        show={isDropdownOpentask}
                                        onToggle={toggleDropdowntask}
                                        className="rounded-pill mb-2"
                                    >
                                        <NavDropdown.Item as={Link} to="create-form" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Create Form
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="update-form" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Update Form
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="table" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Table
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#" id="cultures" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-vial me-2"></i>
                                        Cultures
                                    </Nav.Link>
                                    <Nav.Link href="#" id="culture_options" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-vial me-2"></i>
                                        Culture options
                                    </Nav.Link>
                                    <Nav.Link href="#" id="antibiotics" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fas fa-capsules me-2"></i>
                                        Antibiotics
                                    </Nav.Link>
                                    <Nav.Link href="#" id="doctors" className="rounded-pill px-3 py-2 mb-2">
                                        <i className="fa fa-user-md me-2"></i>
                                        Doctors
                                    </Nav.Link>
                                    <NavDropdown
                                        title={
                                            <>
                                                <i className="fas fa-list me-2"></i>
                                                Price List
                                            </>
                                        }
                                        id="prices"
                                        show={isDropdownOpen}
                                        onToggle={toggleDropdown}
                                        className="rounded-pill mb-2"
                                    >
                                        <NavDropdown.Item href="#" onClick={closeDropdown} id="tests_prices" className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Tests
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#" onClick={closeDropdown} id="cultures_prices" className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Cultures
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </div>
                            {user && (
                                <div className="border-top pt-3">
                                    <Button variant="link" className="text-decoration-none d-flex align-items-center" onClick={logout}>
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </Col>
                    ) : (
                        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} className="d-flex flex-column justify-content-between border-end vh-100 m-0">
                            <div>
                                <Navbar.Brand href="#">
                                    <Image src="images/logo.svg" width={128} alt="" />
                                </Navbar.Brand>
                                <div className="mt-4 text-center">
                                    <Image
                                        src={user?.photoURL}
                                        rounded
                                        width={40}
                                        height={40}
                                        alt=""
                                    />
                                </div>
                                <Nav className="mt-4 flex-column d-flex align-items-center">
                                    <Nav.Link as={Link} to="/" title="Dashboard" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-th"></i>
                                    </Nav.Link>

                                    <Nav.Link href="#" id="profile" title="Profile" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-user-circle"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="groups" title="Invoices" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-layer-group"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="reports" title="Reports" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-flag"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="branches" title="Branches" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-map-marked-alt"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="tests" title="Tests" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-flask"></i>
                                    </Nav.Link>
                                    <NavDropdown
                                        title={<i className="fa-regular fa-star"></i>}
                                        id="tasks"
                                        show={isDropdownOpentask}
                                        onToggle={toggleDropdowntask}
                                        className="rounded-pill mb-2"
                                    >
                                        <NavDropdown.Item as={Link} to="create-form" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Create Form
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="update-form" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Update Form
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="table" onClick={closeDropdowntask} className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Table
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="#" id="cultures" title="Cultures" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-vial"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="culture_options" title="Culture Options" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-vial"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="antibiotics" title="Antibiotics" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fas fa-capsules"></i>
                                    </Nav.Link>
                                    <Nav.Link href="#" id="doctors" title="Doctors" className="rounded-pill px-2 py-1 mb-2">
                                        <i className="fa fa-user-md"></i>
                                    </Nav.Link>
                                    <NavDropdown
                                        title={<i className="fas fa-list"></i>}
                                        id="prices"
                                        show={isDropdownOpen}
                                        onToggle={toggleDropdown}
                                        className="rounded-pill mb-2"
                                    >
                                        <NavDropdown.Item href="#" onClick={closeDropdown} id="tests_prices" className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Tests
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#" onClick={closeDropdown} id="cultures_prices" className="rounded-pill px-3 py-2">
                                            <i className="far fa-circle me-2"></i>
                                            Culture
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </div>
                            {user && (
                                <div className="border-top pt-3">
                                    <Button variant="link" className="text-decoration-none d-flex align-items-center" onClick={logout}>
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                    </Button>
                                </div>
                            )}
                        </Col>
                    )}
                    <Col xs={visible ? 11 : 11} sm={visible ? 11 : 11} md={visible ? 11 : 11} lg={visible ? 11 : 11} xl={visible ? 11 : 11} xxl={visible ? 10 : 11} className='px-0'>
                        <Navbar bg="light" expand="lg" className="sticky-top border-bottom py-2">
                            <Container fluid>
                                <Navbar.Brand href="#" onClick={toggleVisible}>
                                    <i className="fas fa-bars"></i>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link className="d-none d-lg-block">Dashboard</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link href="#" className="d-none d-md-block rounded-pill px-3 py-2 bg-light border">
                                            <i className="fas fa-search"></i>
                                        </Nav.Link>
                                        <Nav.Link href="#" className="d-md-none rounded-pill px-3 py-2 bg-light border">
                                            <i className="fas fa-search"></i>
                                        </Nav.Link>
                                        <Nav.Link href="#" className="rounded-pill px-3 py-2 bg-light border mx-2">
                                            <i className="fas fa-comment-dots"></i>
                                        </Nav.Link>
                                        <Nav.Link href="#" className="rounded-pill px-3 py-2 bg-light border">
                                            <i className="fas fa-bell"></i>
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;