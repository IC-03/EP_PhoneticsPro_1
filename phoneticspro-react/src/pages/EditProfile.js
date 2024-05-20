import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditProfile = () => {

    return (
        <div>
            <div>
            <Navbar/>
            </div>
            <div className="container mt-5 p-5" style={{backgroundColor: 'rgb(204, 204, 204)', borderRadius: 15}}>
  <div className="justify-content-center">
    <div className="text-center ">
      <h3>Editar perfil</h3>
      <div className="mb-2 mt-2">
        <img src="../assets/images/usuario.png" alt="" style={{width: 64, height: 64}} />
      </div>
      <button className="btn btn-primary">Cambiar Foto</button>
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="name_user" className="form-label">Nombre de usuario</label>
    <input type="text" className="form-control" placeholder="NombreUsuario" id="name_user" />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Correo electrónico</label>
    <input type="email" className="form-control" placeholder="correo@example.com" id="email" />
  </div>
  <div className="mb-3">
    <label htmlFor="contVieja" className="form-label">Contraseña vieja</label>
    <input type="password" className="form-control" id="contVieja" />
    <div className="form-text">
      Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe contener
      espacios, caracteres especiales ni emojis.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="password_user" className="form-label">Contraseña nueva</label>
    <input type="password" className="form-control" id="password_user" />
  </div>
  <div>
    <button className="btn btn-success text-center my-3" id="guardar" onclick="editarPerfil()">Guardar Cambios</button>
  </div>
  <div className="form-text pt-2">
    Borrar cuenta
  </div>
  <button className="btn btn-danger text-center mt-1 mb-2" onclick="borrarPerfil()"> Borrar cuenta </button>
  <div className="form-check">
    <input className="form-check-input" type="checkbox" defaultValue id="seguroBorrar" />
    <label className="form-check-label" htmlFor="seguroBorrar">
      ¿Está seguro de borrar su perfil?
    </label>
  </div>
</div>

</div>

    );
}

export default EditProfile;