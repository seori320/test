import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="게시판" id="basic-nav-dropdown">
                <NavDropdown.Item href="/postlist">글목록</NavDropdown.Item>
                <NavDropdown.Item href="/postwrite">글추가</NavDropdown.Item>
              </NavDropdown>
              <Nav className="me-auto">

                {auth ? (
                    <>
                      <Nav.Link href={"/checkpwd"}> {auth} 님 반갑습니다 </Nav.Link>
                      <Nav.Link href="/logout">로그아웃</Nav.Link>
                    </>
                ) : (
                    <>
                      <Nav.Link href="/login">로그인</Nav.Link>
                      <Nav.Link href="/join">회원가입</Nav.Link>
                    </>
                )}

              </Nav>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
