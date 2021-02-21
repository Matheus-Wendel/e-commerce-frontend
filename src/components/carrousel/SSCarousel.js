import { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class SSCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "Sua Música aqui",
          description:
            "Nulla vitae elit libero, a pharetra augue mollis interdum.",
        },
        {
          title: "Entre e confira",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          title: "Promoções de discos e cds",
          description:
            " Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
        },
      ],
    };
  }

  render() {
    const { items } = this.state;
    const carrouselItems = items.map((item, i) => {
      return (
        <Carousel.Item interval={1000}>
          <img
            style={{
              filter: "brightness(50%)",
            }}
            className="d-block w-100"
            src={`https://picsum.photos/800/300?random=${i}`}
            alt={`${i} Slide`}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    return <Carousel {...this.props}>{carrouselItems}</Carousel>;
  }
}
