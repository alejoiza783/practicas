import React, { useState, useEffect } from 'react';
import MatchesChats from '../chats/matches_chats';
import './formulario_1.css';
import '../botones/botones_perfil.css';
import ModalMatches from './modal_matches.jsx';
import { 
   
  FaBirthdayCake, 
  FaChild, 
  FaGlobeAmericas, 
  FaLanguage, 
  FaGraduationCap,
  FaEdit,
  FaCheck,
  FaMapMarkerAlt,
  FaCity,
  FaVenusMars,
  FaImages,
  FaPlus,
  FaTimes,
  FaPlay,
  FaAlignLeft,
  
} from 'react-icons/fa';
import { opcionesEstudios } from '../validaciones/validaciones_1';

const paisesLatinoamerica = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", 
  "Costa Rica", "Cuba", "República Dominicana", "Ecuador", 
  "El Salvador", "Guatemala", "Haití", "Honduras", "México", 
  "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico", 
  "Uruguay", "Venezuela"
];

const PerfilPrecargado = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [showMatchesModal, setShowMatchesModal] = useState(false);
  const [editando, setEditando] = useState({
    ubicacion: false,
    idioma: false,
    estudios: false,
    titulo: false,
    foto: false,
    hijos: false,
    pais: false,
  });
  
  const [mostrarMatches, setMostrarMatches] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "Gabriela🖤",
    descripcion: "",
    genero: "Femenino",
    edad: 22,
    foto: require('../../imagenes/fotos/gabi.jpg'),
    tieneHijos: "No",
    ubicacion: "Ecuador",
    provincia: "Cotopaxi",
    ciudad: "Latacunga", 
    idioma: "Español",
    nivelEstudio: "Secundaria",
    tituloUniversitario: "",
    busqueda: "",
    pais: "Ecuador",
    multimedia: []
  });

  const [imagenTemporal, setImagenTemporal] = useState(null);
  const { mostrarTitulo, opciones } = opcionesEstudios(datos.nivelEstudio);

  const handleChange = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
    
    if (campo === 'nivelEstudio' && valor !== "Universitario") {
      setDatos(prev => ({ ...prev, tituloUniversitario: "" }));
    }
  };

  const toggleEdicion = (campo) => {
    if (editando[campo]) {
      // Si está en modo edición (click en ✔️)
      setCampoActualEditando(campo);
      setMostrarModalConfirmacion(true);
    } else {
      // Entrar en modo edición (click en ✏️)
      setEditando(prev => ({ ...prev, [campo]: true }));
    }
  };
  
  const confirmarGuardado = () => {
    setEditando(prev => ({ ...prev, [campoActualEditando]: false }));
    setMostrarModalConfirmacion(false);
  };

  const cancelarGuardado = () => {
    setMostrarModalConfirmacion(false);
    // No cambiamos el estado de edición para permitir seguir editando
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenTemporal(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmar = () => {
    setMostrarModal(false);
    console.log("Datos guardados:", datos);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMatchesModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [archivosPrevisualizacion, setArchivosPrevisualizacion] = useState([]);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [mediaZoom, setMediaZoom] = useState(null);

  const [zoomFotoPerfil, setZoomFotoPerfil] = useState(false);
  
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [campoActualEditando, setCampoActualEditando] = useState(null);

  const ModalConfirmacion = () => (
    <div className="modal-overlay">
      <div className="modal-edicion">
        <h3>¿Guardar cambios?</h3>
        <p>¿Estás seguro de que quieres actualizar esta información?</p>
        <div className="modal-actions">
          <button className="btn-confirmar" onClick={confirmarGuardado}>
            Confirmar
          </button>
          <button className="btn-cancelar" onClick={cancelarGuardado}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="perfil-container">
      <div className="menu-perfil">
        <div className="tags-superiores">
          <span className="tag">Les gustas</span>
          <span className="tag">Amistad</span>
          <span 
            className="tag" 
            onClick={() => setMostrarMatches(true)}
            style={{ cursor: 'pointer' }}
          >
            Matches
          </span>
          <span 
            className="tag"
            onClick={() => setMostrarMatches(false)}
            style={{ cursor: 'pointer' }}
          >
            Perfil
          </span>
        </div>
      </div>

      {!mostrarMatches ? (
      <>
        <div className="foto-container"style={{ position: 'relative' }} >
          <div className="contenedor-foto-perfil" onClick={() => setZoomFotoPerfil(true)} style={{ display: 'inline-block' }} >
            <img 
              src={imagenTemporal || datos.foto} 
              alt="Foto de perfil" 
              className="foto-perfil"
            />
          </div>
          <button 
            className="editar-btn"
            onClick={() => { toggleEdicion('foto')}}
          >
            {editando.foto ? <FaCheck /> : <FaEdit />}
          </button>
          {editando.foto && (
            <div className="cambiar-foto">
              <input
                type="file"
                id="foto-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="foto-input" className="foto-label">
                Seleccionar imagen
              </label>
            </div>
          )}
        </div>
        {zoomFotoPerfil && (
          <div className="modal-zoom-overlay" onClick={() => setZoomFotoPerfil(false)}>
            <div className="contenedor-zoom" onClick={(e) => e.stopPropagation()}>
              <img 
                src={imagenTemporal || datos.foto} 
                alt="Foto de perfil en zoom" 
                className="media-zoom"
              />
              <button 
                className="cerrar-zoom" 
                onClick={() => setZoomFotoPerfil(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        <div className="datos-container">
          <h1 className="nombre">{datos.nombre}, {datos.edad}</h1>
          {/* Nueva línea que muestra lo que busca */}
          {datos.busqueda && (
            <div className="contenedor-busqueda-centrado">
              <span className="label-busqueda-centrado">
                {datos.busqueda}
              </span>
            </div>
          )}
          <div className="campo-descripcion">
            <div className="descripcion-header">
              <FaAlignLeft className="icono-descripcion" />
              <span className="etiqueta-descripcion">Descripción:</span>
              <button 
                className="editar-btn-descripcion"
                onClick={() => toggleEdicion('descripcion')}
              >
                {editando.descripcion ? <FaCheck /> : <FaEdit />}
              </button>
            </div>

            {editando.descripcion ? (
              <div className="contenedor-editable-descripcion">
                <textarea
                  value={datos.descripcion}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                  className="input-descripcion"
                  placeholder="Cuéntanos sobre ti..."
                  rows="4"
                  maxLength="500"
                  autoFocus
                />
                <div className="contador-caracteres">
                  {datos.descripcion.length}/500 caracteres
                </div>
              </div>
            ) : (
              <p className="texto-descripcion">
                {datos.descripcion || "No hay descripción aún. Haz clic en el lápiz para agregar una."}
              </p>
            )}
          </div>

          <div className="campo">
            <FaBirthdayCake className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Edad:</span>
              <span className="valor">{datos.edad} años</span>
            </div>
          </div>

          <div className="campo">
            <FaVenusMars className="icono" /> 
            <div className="dato-contenedor">
              <span className="etiqueta">Género:</span>
              <span className="valor">{datos.genero}</span>
            </div>
          </div>

          <div className="campo">
            <FaChild className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Hijos:</span>
              {editando.hijos ? (
                <select
                  value={datos.tieneHijos}
                  onChange={(e) => handleChange('tieneHijos', e.target.value)}
                  className="input-editable"
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                  <option value="Sin Especificar">Sin Especificar</option>
                </select>
              ) : (
                <span className="valor">{datos.tieneHijos}</span>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('hijos')}
            >
              {editando.hijos ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <FaGlobeAmericas className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">País:</span>
              {editando.pais ? (
                <select
                  value={datos.pais}
                  onChange={(e) => handleChange('pais', e.target.value)}
                  className="input-editable"
                >
                  {paisesLatinoamerica.map(pais => (
                    <option key={pais} value={pais}>{pais}</option>
                  ))}
                </select>
              ) : (
                <span className="valor">{datos.pais}</span>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('pais')}
            >
              {editando.pais ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <FaMapMarkerAlt className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Provincia:</span>
              {editando.provincia ? (
                <input
                  type="text"
                  value={datos.provincia}
                  onChange={(e) => handleChange('provincia', e.target.value)}
                  className="input-editable"
                />
              ) : (
                <span className="valor">{datos.provincia}</span>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('provincia')}
            >
              {editando.provincia ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <FaCity className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Ciudad:</span>
              {editando.ciudad ? (
                <input
                  type="text"
                  value={datos.ciudad}
                  onChange={(e) => handleChange('ciudad', e.target.value)}
                  className="input-editable"
                />
              ) : (
                <span className="valor">{datos.ciudad}</span>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('ciudad')}
            >
              {editando.ciudad ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <FaLanguage className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Idioma:</span>
              {editando.idioma ? (
                <input
                  type="text"
                  value={datos.idioma}
                  onChange={(e) => handleChange('idioma', e.target.value)}
                  className="input-editable"
                />
              ) : (
                <span className="valor">{datos.idioma}</span>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('idioma')}
            >
              {editando.idioma ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <FaGraduationCap className="icono" />
            <div className="dato-contenedor">
              <span className="etiqueta">Estudios:</span>
              {editando.estudios ? (
                <div className="estudios-container">
                  <select
                    value={datos.nivelEstudio}
                    onChange={(e) => handleChange('nivelEstudio', e.target.value)}
                    className="input-editable"
                  >
                    {opciones.map(opcion => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                  
                  {mostrarTitulo && (
                    <div className="titulo-container">
                      <span className="etiqueta">Título:</span>
                      <input
                        type="text"
                        value={datos.tituloUniversitario}
                        onChange={(e) => handleChange('tituloUniversitario', e.target.value)}
                        className="input-editable"
                        placeholder="Ej: Ingeniería en Sistemas"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <span className="valor">{datos.nivelEstudio}</span>
                  {mostrarTitulo && datos.tituloUniversitario && (
                    <div className="titulo-mostrado">
                      <span className="valor"> - {datos.tituloUniversitario}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button 
              className="editar-btn"
              onClick={() => toggleEdicion('estudios')}
            >
              {editando.estudios ? <FaCheck /> : <FaEdit />}
            </button>
          </div>

          <div className="campo">
            <div className="busqueda-container">
              <h3 className="titulo-busqueda">¿Qué buscas aquí?</h3>
              {editando.busqueda ? (
                <div className="opciones-busqueda">
                  {['Busco solo una amistad contigo', 'Quiero tener sexo con una pareja', 'Busco tener una relacion estable'].map((opcion) => (
                    <label key={opcion} className="opcion-label">
                      <input
                        type="radio"
                        name="busqueda"
                        value={opcion}
                        checked={datos.busqueda === opcion}
                        onChange={() => handleChange('busqueda', opcion)}
                        className="opcion-radio"
                      />
                      <span className="opcion-texto">{opcion}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className='teto-busqueda'>
                  {datos.busqueda || 'No especificado'}
                </p>
              )}
              <button 
                className="editar-btn"
                onClick={() => toggleEdicion('busqueda')}
              >
                {editando.busqueda ? <FaCheck /> : <FaEdit />}
              </button>
              {mostrarModal && (
                <ModalConfirmacion 
                  onConfirm={handleConfirmar}
                  onCancel={handleCancelar}
                />
              )}
            </div>
          </div>

          <div className="seccion-multimedia">
            <h3><FaImages /> Galería</h3>
            
            <input
              type="file"
              id="subir-multimedia"
              accept="image/*, video/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 10);
                const previews = files.map(file => ({
                  url: URL.createObjectURL(file),
                  type: file.type.startsWith('video') ? 'video' : 'image',
                  name: file.name
                }));
                setArchivosPrevisualizacion([...archivosPrevisualizacion, ...previews]);
              }}
              style={{ display: 'none' }}
            />
            
            <div className="contenedor-multimedia">
              {archivosPrevisualizacion.map((item, index) => (
                <div key={index} className="item-multimedia">
                  <div 
                    className="contenedor-media"
                    onClick={() => {
                      setMediaZoom(item);
                      setZoomVisible(true);
                    }}
                  >
                    {item.type === 'video' ? (
                      <>
                        <video>
                          <source src={item.url} type="video/mp4" />
                        </video>
                        <FaPlay className="icono-play" />
                      </>
                    ) : (
                      <img src={item.url} alt={`Preview ${index}`} />
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      URL.revokeObjectURL(item.url);
                      setArchivosPrevisualizacion(
                        archivosPrevisualizacion.filter((_, i) => i !== index)
                      );
                    }}
                    className="eliminar-multimedia"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              
              <label htmlFor="subir-multimedia" className="boton-agregar-multimedia">
                <FaPlus /> Agregar
              </label>
            </div>
          </div>

          {zoomVisible && (
            <div className="modal-zoom-overlay" onClick={() => setZoomVisible(false)}>
              <div className="contenedor-zoom" onClick={(e) => e.stopPropagation()}>
                {mediaZoom.type === 'video' ? (
                  <video controls autoPlay className="media-zoom">
                    <source src={mediaZoom.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={mediaZoom.url} alt="Zoom" className="media-zoom" />
                )}
                <button 
                  className="cerrar-zoom" 
                  onClick={() => setZoomVisible(false)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>
      </>
      ) : (
         <MatchesChats onClose={() => setMostrarMatches(false)} />
      )}
      
      {showMatchesModal && (
        <ModalMatches onClose={() => setShowMatchesModal(false)} />
      )}
      {mostrarModalConfirmacion && <ModalConfirmacion />}
    </div>
  );
};

export default PerfilPrecargado;