import { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class SSCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "SoundSource",
          description: "O melhor na internet para encontrar sua música.",
          imgLink:
            "https://image.winudf.com/v2/image/Y29tLk1vYmlsZVN0cmFuZ2VyLmFwcDAwODBfc2NyZWVuXzBfM3VnaWRlM2E/screen-0.jpg?fakeurl=1&type=.jpg",
        },
        {
          title: "Encontre seu novo álbum preferido",
          description: "Busque por nome, artista, gênero, gravadora...",
          imgLink:
            "https://i.pinimg.com/originals/db/b3/37/dbb3378ac8b46699dfd456c6fda3bcb5.jpg",
        },
        {
          title: "Promoções de discos e cds",
          description: "Os melhores preços aqui",
          imgLink:
            "https://cdn.pixabay.com/photo/2018/08/22/20/23/cd-3624544_960_720.jpg",
        },
      ],
    };
  }

  render() {
    const { items } = this.state;
    const carrouselItems = items.map((item, i) => {
      return (
        <Carousel.Item interval={5000}>
          <img
            style={{
              filter: "brightness(50%)",
              width: "800px",
              height: "300px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src={item.imgLink}
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
