import React, { useEffect, useState } from 'react';
import Perfil from './componentes/formularios/formulario_1';
import { obtenerDatosPerfil } from './componentes/funcionalidad/funcion_perfil';
import fondo from './imagenes/fondo-perfil.jpg'; 
import './CSS/App.css';

function App() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const idUsuario = 123;
        const datos = await obtenerDatosPerfil(idUsuario);
        setPerfil(datos);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar el perfil:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, []);

  if (cargando) {
    return (
      <div className="app-loading" style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="spinner-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error" style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="content-overlay">
        <Perfil datos={perfil} />
      </div>
    </div>
  );
}

export default App;