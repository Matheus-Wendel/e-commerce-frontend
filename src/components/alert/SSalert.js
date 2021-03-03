import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

export default class SSAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { showAlert, variant, title } = this.props;
    const messages = this.props.messages || [];
    if (!showAlert) {
      return <></>;
    }

    return (
      <Alert variant={variant || "danger"}>
        <Alert.Heading>{title || "Erro"}</Alert.Heading>
        {messages.map((message) => {
          return <p>{message}</p>;
        })}
      </Alert>
    );
  }
}
