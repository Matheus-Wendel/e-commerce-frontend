import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopCircle,
  faCompactDisc,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default class SSForm extends Component {
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { children, onDelete, ...rest } = this.props;

    return (
      <Form
        noValidate
        onSubmit={this.props?.onSubmit || this.handlePreventDefaut}
        validated={this.props.hasError}
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
          {this.props.allowDelete && (
            <Col md={3}>
              <Button
                variant="danger"
                block
                disabled={this.props?.disabled}
                onClick={this.props?.onDelete || this.handlePreventDefaut}
              >
                <FontAwesomeIcon className="mr-2" icon={faTrashAlt} />
                {this.props?.customDeleteText || "Excluir"}
              </Button>
            </Col>
          )}
        </Form.Row>
      </Form>
    );
  }
}
