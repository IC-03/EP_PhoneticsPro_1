import React from 'react';
import { Link } from "react-router-dom";
import '../assets/css/style.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={" "} className="navbar-brand" id="Home2">
          {" "}
          Phonetics Pro{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            src="../assets/images/menu.png"
            alt=""
            style={{ width: 16, height: 16 }}
          />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link"
                aria-current="page"
                id="Home"
              ></Link>
            </li>
            <li className="nav-item">
              <Link to={"/iniciar-sesion"} className="nav-link">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/registro"} className="nav-link">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                {" "}
                Acerca de{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/editar-perfil"}
                id="perfilLink"
                className="nav-link"
              ></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
