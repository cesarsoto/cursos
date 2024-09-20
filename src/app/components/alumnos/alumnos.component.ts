import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CommonListarComponent } from '../common-listar.component';
import { BASE_ENDPOINT } from 'src/app/config/app';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent
extends CommonListarComponent<Alumno, AlumnoService> implements OnInit {

  baseEndpoint = BASE_ENDPOINT + '/alumnos';
  
  constructor(service: AlumnoService) {
     super(service);	
     this.titulo = 'Listado de Alumnos';
     this.nombreModel = Alumno.name;

  }
}