// src/utils/validaciones.js
export const opcionesEstudios = (nivelEstudio) => {
    if (nivelEstudio === "Universitario") {
      return {
        mostrarTitulo: true,
        opciones: ["Primaria", "Secundaria", "Universitario"]
      };
    }
    return {
      mostrarTitulo: false,
      opciones: ["Primaria", "Secundaria", "Universitario"]
    };
  };