import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import SSForm from "../../components/form/SSForm";
import ArtistForm from "../../components/artist/artistForm";
import SSFormLayout from "../../layout/SSFormLayout";
import ArtistTable from "../../components/artist/artistTable";

export default class SignUp extends Component {
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
            Cadastro de artistas
          </Card.Title>
          <hr />

          <SSForm onSubmit={this.handlePreventDefaut}>
            <ArtistForm />
            <hr />
          </SSForm>
          <hr />
          <h3>Artistas cadastrados</h3>
          <ArtistTable />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
