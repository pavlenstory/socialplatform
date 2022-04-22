import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function MenuBar() {
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
          <Nav>
            <Nav.Link href="login" active={activeItem === "login"}>
              Login
            </Nav.Link>
            <Nav.Link href="register" active={activeItem === "register"}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
