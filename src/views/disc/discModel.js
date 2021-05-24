export default class Disc {
  constructor() {
    this.name = "";
    this.description = "";
    this.imgLink = "";
    this.recorder = { id: "" };
    this.pricing = { id: "" };
    this.releaseDate = "";
    this.genres = [];
    this.artists = [];
    this.activationDetails = { motive: "", category: "" };
  }
}
