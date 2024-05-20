import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="container mt-5 p-5"
        style={{ backgroundColor: "rgb(204, 204, 204)", borderRadius: 15 }}
      >
        <div className="justify-content-center">
          <div className="text-center ">
            <h3>Bienvenido</h3>
            <div className="mb-2">
              <img
                src="../assets/images/usuario.png"
                alt=""
                style={{ width: 128, height: 128 }}
              />
            </div>
            <div className="mb-3">
              <label id="name_user" className="form-label">
                Nombre de usuario
              </label>
            </div>
            <div
              className="container"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <h4>Seguimiento Diario</h4>
              <div id="mostrarAttempt" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
