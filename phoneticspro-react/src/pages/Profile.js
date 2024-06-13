import React from 'react';
import Navbar from '../components/Navbar';
import profileimg from '../assets/images/usuario.png';


const Profile = () => {

  return (
    <div>
      <Navbar />
      <div className="container mt-5 p-5" style={{ backgroundColor: 'rgb(204, 204, 204)', borderRadius: 15 }}>
        <div className="justify-content-center">
          <div className="text-center">
            <h3>Bienvenido, </h3>
            <div className="mb-2">
              <img src={profileimg} alt="" style={{ width: 128, height: 128 }} />
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
