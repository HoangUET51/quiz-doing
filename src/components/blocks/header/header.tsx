import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { requestDataSuccess } from "../../../redux/useSlice/useSlice";

interface HeaderHomePageProps {
  self: any;
}

export default function HeaderHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const account = useSelector((state: any) => state.users.account);
  const isAuthentication = useSelector(
    (state: any) => state.users.isAuthentication
  );
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    navigate("/login");
    dispatch(requestDataSuccess());
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
            <Link className="nav-link" to="/">
              Home
            </Link>
            {isAuthentication && (
              <>
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </>
            )}
          </Nav>
          {!isAuthentication ? (
            <Nav>
              <button className="btn-login" onClick={handleLogin}>
                Log in
              </button>
              <button className="btn-signup" onClick={handleSignUp}>
                Sign up
              </button>
            </Nav>
          ) : (
            <Nav>
              <button className="btn-login">Setting</button>
              <button className="btn-signup" onClick={handleLogout}>
                Log out
              </button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
