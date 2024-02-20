import { Component } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { NgForm } from '@angular/forms';
import { Tarea } from 'src/app/models/tareas';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  nombresDeTareas: string[] = [];
  tareaCreada: boolean = false;
  tareaReutilizada: boolean = false;
  mensajeTarea: string = '';

  constructor(public tareaServices: TareaService) {}

  ngOnInit(): void {
    this.getTareas();
    this.getNombresDeTareas();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getTareas() {
    this.tareaServices.getTareas().subscribe(
      res => {
        this.tareaServices.tareas = res;
      },
      err => console.error(err)
    );
  }

  getNombresDeTareas() {
    this.tareaServices.getNombresDeTareas().subscribe(
      nombres => this.nombresDeTareas = nombres,
      err => console.error(err)
    );
  }

  addTarea(form: NgForm) {
    const nombreTarea = form.value.datosCompartidos;
    
    // Verificar si el nombre ya existe
    if (this.nombresDeTareas.includes(nombreTarea)) {
      // Si existe, mostrar alerta de reutilización
      this.tareaCreada = false;
      this.tareaReutilizada = true;
      this.mensajeTarea = 'Se ha reutilizado el nombre de la tarea.';
    } else {
      // Si no existe, crear nueva tarea
      this.tareaServices.createTarea({
        datosCompartidos: nombreTarea,
        tareaDatosEspecifico: form.value.tareaDatosEspecifico,
        fechaTerminacion: form.value.fechaTerminacion
      } as Tarea).subscribe(
        res => {
          this.getTareas();
          form.reset();
          // Mostrar alerta de creación
          this.tareaCreada = true;
          this.tareaReutilizada = false;
          this.mensajeTarea = 'Se ha creado una nueva instancia de tarea.';
        },
        err => console.error(err)
      );
    }
  }

  deleteTarea(id: number) {
    if (confirm('Estás seguro de querer eliminar la tarea?')) {
      this.tareaServices.deleteTarea(id).subscribe(
        () => {
          this.getTareas();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  editTarea(tarea: Tarea) {
    this.tareaServices.selectedTarea = tarea;
  }
}
