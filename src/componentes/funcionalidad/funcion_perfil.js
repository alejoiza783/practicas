export const obtenerDatosPerfil = async (idUsuario) => {
  // Simulación de datos de perfil
  return {
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
  };
};