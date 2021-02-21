import React, { Component } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle, faCompactDisc } from "@fortawesome/free-solid-svg-icons";

export default class SSNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
          SoundSource
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Minhas compras</Nav.Link>
            <Nav.Link href="#pricing">Meus dados</Nav.Link>
            <NavDropdown title="Administrativo" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Artistas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Gravadoras</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Cadastro de discos
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signUp">Cadastre-se</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
