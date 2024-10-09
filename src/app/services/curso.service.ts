import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected override baseEndpoint = BASE_ENDPOINT + '/cursos';

  constructor(http: HttpClient) {
    super(http);
  }

  asignarAlumnos(curso: Curso, alumnos: Alumno[]): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndpoint}/${curso.id}/asignar-alumnos`,
      alumnos,
      { headers: this.cabeceras });
  }

  eliminarAlumno(curso: Curso, alumno: Alumno): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndpoint}/${curso.id}/eliminar-alumno`,
      alumno,
      { headers: this.cabeceras });
  }
}