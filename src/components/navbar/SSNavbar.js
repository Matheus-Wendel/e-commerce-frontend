import {
  faCompactDisc,
  faDoorOpen,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../App.css";
import { getAuthInfo, getLoggedUser } from "../../utils/utils";

export default class SSNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      authInfo: getAuthInfo(),
    };
  }
  async componentDidMount() {
    const loggedUser = await getLoggedUser();
    this.setState({ loggedUser });
  }

  render() {
    const { loggedUser, authInfo } = this.state;
    console.log(loggedUser);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
          SoundSource
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {authInfo?.Permission === "CLIENT" && (
              <>
                <Nav.Link href="#features">Minhas compras</Nav.Link>
                <Nav.Link href="#pricing">Meus dados</Nav.Link>
              </>
            )}
            {authInfo?.Permission === "EMPLOYEE" && (
              <>
                <NavDropdown
                  title="Administrativo"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/artist">Artistas</NavDropdown.Item>
                  <NavDropdown.Item href="/genres">Gêneros</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/disc">
                    Cadastro de discos
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {loggedUser?.name && (
              <Navbar.Text className="mx-2">{loggedUser.name}</Navbar.Text>
            )}
            {authInfo?.Permission === "CLIENT" && (
              <Nav.Link href="/cart">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Meu carrinho
              </Nav.Link>
            )}
            {authInfo && (
              <Nav.Link href="/login">
                <FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
                Sair
              </Nav.Link>
            )}
            {!authInfo && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signUp">Cadastre-se</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
