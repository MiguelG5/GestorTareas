class Actividad {
    constructor(id, nombre, duracion) {
      this.id = id; // Agrega un identificador único para cada actividad
      this.nombre = nombre;
      this.duracion = duracion;
    }
  }
  
  // Fábrica de Actividades utilizando el patrón Flyweight
  class ActividadFlyweightFactory {
    constructor() {
      this.actividades = {};
      this.nextId = 1; // Contador para generar identificadores únicos
    }
  
    obtenerActividad(nombre, duracion) {
      const id = this.nextId++;
      
      if (!this.actividades[nombre]) {
        this.actividades[nombre] = new Actividad(id, nombre, duracion);
      }
      
      return this.actividades[nombre];
    }
  }
  
  module.exports = { Actividad, ActividadFlyweightFactory };
  