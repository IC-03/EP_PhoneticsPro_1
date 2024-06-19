import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import profileimg from "../assets/images/usuario.png";
import { useNavigate } from 'react-router-dom';
import APIInvoke from "../utils/APIInvoke";
import swal from "sweetalert";


const EditProfile = () => {

  const navigate = useNavigate();

  const id_user_ = sessionStorage.getItem("id_user");

  const [BDusuario, setBDUsuario] = useState({
    id_user: "",
    email: "",
    name_user: "",
    password_user: ""
  });



  const [usuario, setUsuario] = useState({
    new_email: "",
    old_password_user: "",
    new_name_user: "",
    new_password_user: ""
  });

  const { new_email, old_password_user, new_name_user, new_password_user } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  
  const cargarUsuario = async () => {
    try {
      const response = await APIInvoke.invokeGET(`api/Users/list/${id_user_}`);
      if (response) {
        setBDUsuario(response);
      } else {
        throw new Error("No se pudo obtener el usuario");
      }
    } catch (error) {
      console.error("Error al cargar el usuario", error);
    }
  }

  useEffect(() => {
    if(id_user_ >= 0){
      cargarUsuario();
    }
  })

  const ActualizarUsuario = async () => {
    if(BDusuario.password_user === usuario.old_password_user){
      if(usuario.new_email === ""){
        usuario.new_email = BDusuario.email;
      }
      if(usuario.new_password_user === ""){
        usuario.new_password_user = BDusuario.password_user;
      }
      if(usuario.new_name_user === ""){
        usuario.new_name_user = BDusuario.name_user;
      }
      const data = {
        id_user: BDusuario.id_user,
        email: usuario.new_email,
        password_user: usuario.new_password_user,
        name_user: usuario.new_name_user
      }
      const response = await APIInvoke.invokePUT(`api/Users/`, data);
      if (response.id === usuario.id_user) {
        alert("Proveedor editado correctamente")
        navigate("/");
      } else {
        const msg = "Ha ocurrido un error";
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
      }
    }else{
      const msg = "La contraseña anterior no coincide";
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
    }
  
  }

  const onSubmit = (e) => {
    e.preventDefault();
    ActualizarUsuario();
  }


  const Borrado = async () => {
    if(BDusuario.password_user === usuario.old_password_user){
      const response = await APIInvoke.invokeDELETE(`api/Users/${id_user_}`);
      navigate("/");
      sessionStorage.clear();
    
      if (response.success) { // Asumiendo que `response.success` indica una eliminación exitosa
        swal({
          title: "Borrado Exitoso",
          text: "Tu cuenta ha sido borrada satisfactoriamente.",
          icon: "success",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-success",
              closeModal: true,
            },
          },
        });
      } else {
        
      }
    } else {
      const msg = "La contraseña no coincide, debes poner tu contraseña actual";
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
    }
  }

  const borrarCuenta = (e) => {
    e.preventDefault();
    Borrado();
  }
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
      <form onSubmit={onSubmit}>
        <div className="text-center">
          <button className="btn btn-primary btn-sm">Cambiar</button><br /><br />
          {sessionStorage.getItem("name_user")}
        </div>
        <div className="mb-3">
          <label htmlFor="name_user" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={BDusuario.name_user}
            id="new_name_user"
            name="new_name_user"
            value={new_name_user}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            placeholder={BDusuario.email}
            id="new_email"
            name="new_email"
            value={new_email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contVieja" className="form-label">
            Contraseña vieja
          </label>
          <input
            type="password"
            className="form-control"
            id="old_password_user"
            name="old_password_user"
            value={old_password_user}
            onChange={onChange}
            required
          />
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
            id="new_password_user"
            name="new_password_user"
            value={new_password_user}
            onChange={onChange}
            required
          />
        </div>
        <div className="text-center">
          <div className="form-text pt-2">No olvide guardar sus cambios</div>
          <button className="btn btn-success text-center my-3 mb-5" id="guardar">
            Guardar
          </button>
        </div>
      </form>
        <form onSubmit={borrarCuenta}>
        <div className="container p-4 text-center" style={{ backgroundColor: "#EE8D85", borderRadius: 15 }}>
          <h4 className="text-center">Zona de peligro</h4>
          <hr style={{ backgroundColor: "#1C1C1C" }} />
          <div className="form-text">¿Desea borrar su cuenta? </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              required
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
