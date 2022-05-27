import Home from "../home/Home";
import List from "../list/List";
import Contact from "../contact/Contact";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Specific from "../specific/Specific";
import Enquiry from "../enquiry/Enquiry";
import Admin from "../admin/Admin";
import { AuthProvider } from "../../context/AuthContext";
import Navigation from "./Nav";
import AdminEnquiry from "../admin/AdminEnquiry";
import AdminMessages from "../admin/AdminMessages";
import NewEstablishment from "../admin/NewEstablishment";

export default function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" exact="exact" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/list/:category" element={<List />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/list/specific/:id" element={<Specific />} />
            <Route path="/enquiry/:id" element={<Enquiry />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-enquiry" element={<AdminEnquiry />} />
            <Route path="/admin-messages" element={<AdminMessages />} />
            <Route path="/new-establishment" element={<NewEstablishment />} />
          </Routes>
        </Container>
        <div className="footer">
          <div className="social-networks">
            <Nav.Link href="https://www.facebook.com" className="nav-link">
              Facebook
            </Nav.Link>
            <Nav.Link href="https://www.instagram.com" className="nav-link">
              Instagram
            </Nav.Link>
          </div>
          <a href="https://www.bockey.one" className="signature">
            Bockey
          </a>
        </div>
      </Router>
    </AuthProvider>
  );
}
