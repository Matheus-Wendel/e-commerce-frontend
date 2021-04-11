import { Component } from "react";
import { Col, Container, Form } from "react-bootstrap";
import SSCarousel from "../../components/carrousel/SSCarousel";
import SsCatalog from "../../components/catalog/SSCatalog";
import Layout from "../../layout/Layout";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(JSON.parse(localStorage.getItem("user")));
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
                <option>Álbum</option>
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
