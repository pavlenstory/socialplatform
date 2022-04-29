import { useState, useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../context/auth";
function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem] = useState(path);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Social platform</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" active={activeItem === "home"}>
            Home
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <Nav>
              <Nav.Link href="/">{user.username}</Nav.Link>
              <Nav.Link
                href="login"
                active={activeItem === "register"}
                onClick={logout}
              >
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="login" active={activeItem === "login"}>
                Login
              </Nav.Link>
              <Nav.Link href="register" active={activeItem === "register"}>
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
