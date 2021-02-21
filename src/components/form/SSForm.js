import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle, faCompactDisc } from "@fortawesome/free-solid-svg-icons";

export default class SSForm extends Component {
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { children, ...rest } = this.props;

    return (
      <Form
        noValidate
        onSubmit={this.props?.onSubmit || this.handlePreventDefaut}
        {...rest}
      >
        {children}
        <Form.Row>
          <Col md={3}>
            <Button
              type="submit"
              variant="primary"
              block
              disabled={this.props?.disabled}
              onClick={this.props?.onClick}
            >
              <FontAwesomeIcon
                icon={this.props?.customSubmitIcon || faCompactDisc}
                spin
                className="mr-2"
              />
              {this.props?.customSubmitText || "Salvar"}
            </Button>
          </Col>
          <Col md={3}>
            <Button
              type="submit"
              variant="secondary"
              block
              disabled={this.props?.disabled}
              onClick={this.props?.onCancel || this.handlePreventDefaut}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={this.props?.customCancelcon || faStopCircle}
              />
              Cancelar
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
