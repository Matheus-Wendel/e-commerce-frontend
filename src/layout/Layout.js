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
            minHeight: "100vh",
            backgroundColor: "#191c1f",
          }}
        >
          <header className="mb-5">
            <SSNavbar />
          </header>
          <main style={{ flexGrow: "1" }}>{children}</main>
          <footer
            style={{ color: "white", backgroundColor: "#0c0e0f" }}
            className="p-2 "
          >
            <p className="text-center m-0">SoundSource</p>
            <p className="text-center m-0">Matheus Wendel</p>
            <p className="text-center m-0">Fatec Mogi das Cruzes 2021</p>
          </footer>
        </div>
      </>
    );
  }
}
