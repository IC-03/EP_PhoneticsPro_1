import React, { useState } from "react";
import { eyeIcons, togglePassword } from "../utils/PasswordEyeForm.js";
import Navbar from "../components/Navbar";
import swal from "sweetalert";
import APIInvoke from "../utils/APIInvoke";

const Register = () => {

  const [usuario, setUsuario] = useState(
    {
      nombreUsuario: "",
      email: "",
      password: "",
      confirmar: ""
    }
  );

  const { nombreUsuario, email, password, confirmar } = usuario;
  
  const onChange = (e) => {
    setUsuario(
      {
        ...usuario,
        [e.target.name]: e.target.value,
      }
    );
  };
  
  const register = async () => {
    if (password !== confirmar){
      const msg = "Las contraseñas son diferentes.";
      swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
              confirm: {
                  text: 'Ok',
                  value: true,
                  visible: true,
                  className: 'btn btn-danger',
                  closeModal: true
              }
          }
      });
    }else if (password.length < 8 || password.length > 20){
      const msg = "La contraseña deber mínimo 8 caracteres y máximo 20 caracteres.";
      swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
              confirm: {
                  text: 'Ok',
                  value: true,
                  visible: true,
                  className: 'btn btn-danger',
                  closeModal: true
              }
          }
      });
    } else {
        const data = {
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          password: usuario.password
        }
        const response = await APIInvoke.invokePOST(`/api/usuarios`, data);
        const mensaje = response.msg;

        if (mensaje === 'El usuario ya existe') {
          const msg = "El usuario ya existe.";
          swal({
              title: 'Error',
              text: msg,
              icon: 'error',
              buttons: {
                  confirm: {
                      text: 'Ok',
                      value: true,
                      visible: true,
                      className: 'btn btn-danger',
                      closeModal: true
                  }
              }
          });
        } else {
          const msg = "El usuario fue creado correctamente.";
          swal({
              title: 'Información',
              text: msg,
              icon: 'success',
              buttons: {
                  confirm: {
                      text: 'Ok',
                      value: true,
                      visible: true,
                      className: 'btn btn-primary',
                      closeModal: true
                  }
              }
          });

          setUsuario({
              nombreUsuario: '',
              email: '',
              password: '',
              confirmar: ''
          })
        }
    }
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Navbar />
      <div
        className="container mt-5 p-5 mb-5"
        style={{ backgroundColor: "rgb(204, 204, 204)", borderRadius: 15 }}
      >
        <div className="text-center">
          <h3>Regístrate</h3>
        </div>

        <form onSubmit={onSubmit}>

        <div className="input-field mb-3">
          <label htmlFor="nombreUsuario" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="NombreUsuario"
            id="nombreUsuario"
            name="nombreUsuario"
            value={nombreUsuario}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-field mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="correo@example.com"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-field mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              placeholder="************"
              value={password}
              onChange={onChange}
              required
            />
            <div
              className="toggle-button"
              onClick={() => togglePassword(showPassword, setShowPassword)}
            >
              {showPassword ? eyeIcons.closed : eyeIcons.open}
            </div>
          </div>
          <div className="form-text">
            Su contraseña debe tener entre 8 y 20 caracteres, contener letras y
            números, y no debe contener espacios, caracteres especiales ni
            emojis.
          </div>
        </div>
        <div className=" input-field mb-3">
          <label htmlFor="confirmar" className="form-label">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="************"
            id="confirmar"
            name="confirmar"
            value={confirmar}
            onChange={onChange}
            required
          />
        </div>
        <button
          className="btn btn-large btn-success text-center"
          type="submit"
        >
          Registrarme
        </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
