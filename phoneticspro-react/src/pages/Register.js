import React, { useState } from "react";
import { eyeIcons, togglePassword } from "../utils/PasswordEyeForm.js";
import Navbar from "../components/Navbar";
import swal from "sweetalert";
import APIInvoke from "../utils/APIInvoke";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: "",
    passwordUser: "",
    confirmPassword: "",
    nameUser: "",
  });

  const { nameUser, email, passwordUser, confirmPassword } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    if (nameUser.length < 3 ||
      nameUser.length > 20 ||
      /\s/.test(nameUser) ||
      /[^a-zA-Z0-9]/.test(nameUser)
    ) {
      swal({
        title: "Error",
        text: "El nombre de usuario no cumple con los estándares.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (
      passwordUser.length < 8 ||
      passwordUser.length > 20 ||
      /\s/.test(passwordUser) ||
      /[^a-zA-Z0-9]/.test(passwordUser)
    ) {
      const msg = "La contraseña no cumple con los estándares planteados.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (passwordUser !== confirmPassword) {
      const msg = "Las contraseñas no coinciden.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
      return;
    }

    const data = {
      nameUser: usuario.nameUser,
      email: usuario.email,
      passwordUser: usuario.passwordUser,
    };
    const response = await APIInvoke.invokePOST(`api/Users/`, data);
    const mensaje = response.msg;

    if (mensaje === "El usuario ya existe") {
      const msg = "El usuario ya existe.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      const msg = "El usuario fue creado correctamente.";
      sessionStorage.setItem("id_user", response.id);
      sessionStorage.setItem("name_user", response.nameUser);
      navigate("/");
      swal({
        title: "Información",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });

      setUsuario({
        email: "",
        passwordUser: "",
        confirmPassword: "",
        nameUser: "",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  };

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
              id="nameUser"
              name="nameUser"
              value={nameUser}
              onChange={onChange}
              required
            />
            <div>
              <small className="form-text text-muted">
                Su nombre de usuario debe tener más de tres carácteres y menos de 20,
                no debe contener espacios y/o carácteres especiales.
              </small>
            </div>
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
                id="passwordUser"
                name="passwordUser"
                className="form-control"
                placeholder="************"
                value={passwordUser}
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
            <div>
              <small className="form-text text-muted">
                Su contraseña debe tener entre 8 y 20 caracteres, solo letras y
                números, no deben haber espacios, caracteres especiales ni
                emojis.
              </small>
            </div>
          </div>
          <div className="input-field mb-3">
            <label htmlFor="confirmar" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="************"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>
          <button
            className="btn btn-block btn-success text-center"
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
