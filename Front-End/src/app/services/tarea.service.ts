import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tareas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  URL_API = 'http://localhost:4000/api/tareas';

  selectedTarea: Tarea = { datosCompartidos: '', tareaDatosEspecifico: '', fechaTerminacion: '' };
  tareas: Tarea[] = []; // Declara la propiedad 'tareas' aquí

  constructor(private http: HttpClient) { }

  getNombresDeTareas(): Observable<string[]> {
    return this.getTareas().pipe(
      map(tareas => [''].concat(tareas.map(tarea => tarea.datosCompartidos)))
    );
  }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.URL_API).pipe(
      map(tareas => tareas.map(tarea => ({
        ...tarea,
        actividad: { nombre: tarea.datosCompartidos, duracion: tarea.tareaDatosEspecifico } // Adaptación para Flyweight
      } as Tarea)))
    );
  }

  createTarea(tarea: Tarea): Observable<any> {
    // Aquí puedes enviar solo los datos necesarios para crear la tarea en el servidor
    const tareaParaCrear = {
      datosCompartidos: tarea.datosCompartidos,
      tareaDatosEspecifico: tarea.tareaDatosEspecifico,
      fechaTerminacion: tarea.fechaTerminacion
    };
  
    return this.http.post(this.URL_API, tareaParaCrear);
  }
  

  putTarea(tarea: Tarea): Observable<any> {
    // Similar a createTarea, ajusta según sea necesario
    return this.http.put(`${this.URL_API}/${tarea.idActividad}`, tarea);
  }

  deleteTarea(idActividad: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${idActividad}`);
  }
}
