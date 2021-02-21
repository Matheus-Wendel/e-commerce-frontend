import React, { Component } from "react";
import SSNavbar from "../components/navbar/SSNavbar";

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            backgroundColor: "#191c1f",
          }}
        >
          <header className="mb-5">
            <SSNavbar />
          </header>
          <main style={{ flexGrow: "1" }}>{children}</main>
          <footer className="p-2 container-fluid d-flex justify-content-center align-items-center">
            <p className="text-center m-0">SoundSource</p>
            <p className="text-center m-0">Matheus Wendel</p>
            <p className="text-center m-0">Fatec Mogi das Cruzes 2021</p>
          </footer>
        </div>
      </>
    );
  }
}
