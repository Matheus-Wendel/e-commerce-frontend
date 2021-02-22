import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card } from "react-bootstrap";
import DiscForm from "../../components/disc/discForm";
import DiscTable from "../../components/disc/discTable";
import SSForm from "../../components/form/SSForm";
import SSFormLayout from "../../layout/SSFormLayout";

export default class Disc extends Component {
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
            Cadastro de discos
          </Card.Title>
          <hr />

          <SSForm onSubmit={this.handlePreventDefaut}>
            <DiscForm />
            <hr />
          </SSForm>
          <hr />
          <h3>Discos cadastrados</h3>
          <DiscTable />
        </Card.Body>
      </SSFormLayout>
    );
  }
}
