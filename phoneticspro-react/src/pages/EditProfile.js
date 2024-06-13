import React from "react";
import Navbar from "../components/Navbar";
import profileimg from "../assets/images/usuario.png";

const EditProfile = () => {
  return (
    <div>
      <Navbar />
      <div
        className="container mt-5 mb-4 p-5"
        style={{ backgroundColor: "rgb(204, 204, 204)", borderRadius: 15 }}
      >
        <div className="justify-content-center">
          <div className="text-center ">
            <h3>Editar perfil</h3>
            <div className="mb-2 mt-2">
              <img
                src={profileimg}
                alt="profile"
                style={{ width: 128, height: 128 }}
              />
            </div>
          </div>
        </div>
        <form>
          <div className="text-center">
            <button className="btn btn-primary btn-sm">Cambiar</button>
          </div>
          <div className="mb-3">
            <label htmlFor="name_user" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="NombreUsuario"
              id="name_user"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@example.com"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contVieja" className="form-label">
              Contraseña vieja
            </label>
            <input type="password" className="form-control" id="contVieja" />
            <div className="form-text">
              Su contraseña debe tener entre 8 y 20 caracteres, contener letras
              y números, y no debe contener espacios, caracteres especiales ni
              emojis.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password_user" className="form-label">
              Contraseña nueva
            </label>
            <input
              type="password"
              className="form-control"
              id="password_user"
            />
          </div>
          <div className="text-center">
            <div className="form-text pt-2">No olvide guardar sus cambios</div>
            <button className="btn btn-success text-center my-3 mb-5" id="guardar">
              Guardar
            </button>
          </div>
          <div className="container p-4 text-center" style={{backgroundColor: "#EE8D85", borderRadius: 15}}>
            <h4 className="text-center">Zona de peligro</h4>
            <hr style={{backgroundColor: "#1C1C1C"}}/>
            <div className="form-text">¿Desea borrar su cuenta? </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
              />
              <label className="form-check-label" htmlFor="seguroBorrar">
                ¿Está seguro de borrar su perfil?
              </label>
            </div>
            <button className="btn btn-danger text-center mb-">
              Borrar cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
