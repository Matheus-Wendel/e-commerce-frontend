import React, { Component } from "react";
import { Button, Card, Col, Nav, NavDropdown, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../.././logo.svg";
import "../../App.css";
export default class SSCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
        { img: "https://picsum.photos/300/300", name: "Disco", price: 50 },
      ],
    };
  }

  render() {
    const { products } = this.state;
    const catalog = products.map((product, i) => (
      <Col md={4}>
        <div className="mx-3 mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={`${product.img}?random=${i}`}
              style={{ width: "100%", height: "275px" }}
            />
            <Card.Body>
              <Card.Title>{`${product.name} ${i + 1}`}</Card.Title>
              <Card.Text>
                <strong>R${product.price}</strong>
                {/* Some quick example text to build on the card title and make up
                the bulk of the card's content. */}
              </Card.Text>
              <Button variant="dark" block>
                <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                Adicionar ao carrinho
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Col>
    ));

    return <Row>{catalog}</Row>;
  }
}
