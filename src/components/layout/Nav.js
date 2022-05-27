import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogInModal from "../home/LogIn";
import { Offcanvas } from "react-bootstrap";

function Navigation(props) {
  return (
    <Navbar expand="lg">
      <Nav.Link href="/" exact="exact" className="brand-link">
        <Navbar.Brand>Holidaze</Navbar.Brand>
      </Nav.Link>
      <LogInModal />
      <Navbar.Toggle aria-controls="offcanvasNavbar" />
      <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
        <Offcanvas.Header className="ms-auto" closeButton></Offcanvas.Header>
        <Nav>
          <Nav.Link href="/" exact="exact" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link href="/list" className="nav-link">
            All of accommodation
          </Nav.Link>
          <Nav.Link href="/list/category=22" className="nav-link">
            Hotels
          </Nav.Link>
          <Nav.Link href="/list/category=24" className="nav-link">
            Guest Houses
          </Nav.Link>
          <Nav.Link href="/list/category=33" className="nav-link">
            B&B's
          </Nav.Link>
          <Nav.Link href="/contact" className="nav-link">
            Contact
          </Nav.Link>
          <Nav.Link href="/admin" className="nav-link">
            Admin
          </Nav.Link>
          <div className="social-networks">
            <Nav.Link href="https://www.facebook.com" className="nav-link">
              Facebook
            </Nav.Link>
            <Nav.Link href="https://www.instagram.com" className="nav-link">
              Instagram
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default Navigation;
