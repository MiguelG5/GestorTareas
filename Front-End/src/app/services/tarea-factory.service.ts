import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaFactoryService {
  private tareas: { [nombre: string]: Tarea } = {};

  getTarea(nombre: string): Tarea {
    if (!this.tareas[nombre]) {
      // Si no existe, crea una nueva instancia y almacénala
      this.tareas[nombre] = new Tarea(nombre);
    }
    return this.tareas[nombre];
  }

  // Opcional: Obtener todas las tareas existentes
  getAllTareas(): Tarea[] {
    return Object.values(this.tareas);
  }
}

export class Tarea {
  // Atributos específicos del valor extrínseco
  datosCompartidos: string;
  tareaDatosEspecifico: string;
  fechaTerminacion: string;

  constructor(public nombre: string) {
    // Inicializar los atributos específicos del valor extrínseco
    this.datosCompartidos = '';
    this.tareaDatosEspecifico = '';
    this.fechaTerminacion = '';
  }
}