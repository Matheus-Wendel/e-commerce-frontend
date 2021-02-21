import { Component } from "react";
import { Card, Col, Container, Form } from "react-bootstrap";
import Layout from "../../layout/Layout";
import SsCarousel from "../../components/carrousel/SSCarousel";
import SSCarousel from "../../components/carrousel/SSCarousel";
import SsCatalog from "../../components/catalog/SSCatalog";
import SSForm from "../../components/form/SSForm";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Container>
          <SSCarousel className="mb-5" />

          <Form.Row>
            <Form.Group as={Col} md={3}>
              <Form.Control as="select" variant="dark">
                <option>Selecione a categoria</option>
                <option>Artista</option>
                <option>Gravadora</option>
                <option>Album</option>
              </Form.Control>
              <br />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control placeholder="Faça sua busca" />
            </Form.Group>
          </Form.Row>

          <SsCatalog />
        </Container>
      </Layout>
    );
  }
}
