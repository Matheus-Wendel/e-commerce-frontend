import { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import SSNavbar from "../components/navbar/SSNavbar";

export default class SSFormLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <SSNavbar />
        <div style={{ backgroundColor: "#191c1f" }} className="pt-5">
          <Container
            className="py-5"
            style={{ backgroundColor: "#191c1f", minHeight: "100vh" }}
          >
            <Row>
              <Col md={12}>
                <Card className="p-4 w-100" style={{ borderRadius: "0px" }}>
                  {children}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
