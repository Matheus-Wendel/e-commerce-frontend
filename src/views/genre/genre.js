import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSForm from "../../components/form/SSForm";
import GenreForm from "../../components/genre/genreForm";
import GenreTable from "../../components/genre/genreTable";
import SSFormLayout from "../../layout/SSFormLayout";

export default class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    return (
      <SSFormLayout>
        <Card.Body>
          <Card.Title as="h1">
            <FontAwesomeIcon icon={faCompactDisc} spin className="mr-2" />
            Cadastro de gêneros musicais
          </Card.Title>
          <hr />

          <SSForm onSubmit={this.handlePreventDefaut}>
            <GenreForm />
            <hr />
          </SSForm>
          <hr />
          <h3>Gêneros cadastrados</h3>
          <GenreTable />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
