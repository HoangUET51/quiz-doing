import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderHomePageProps {
  self: any;
}

export default function HeaderHomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Doing quiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            <button className="btn-login" onClick={handleLogin}>
              Log in
            </button>
            <button className="btn-signup" onClick={handleSignUp}>
              Sign up
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
