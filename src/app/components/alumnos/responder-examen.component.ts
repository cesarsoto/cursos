import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Examen } from 'src/app/models/examen';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { ResponderExamenModalComponent } from './responder-examen-modal.component';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {

  alumno: Alumno;
  curso: Curso;
  examenes: Examen[] = [];
  mostrarColumnasExamenes = ['id', 'nombre', 'asignaturas', 'preguntas', 'responder', 'ver'];
  pageSizeOptions = ['3', '5', '10', '20', '30', '50'];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.alumnoService.ver(id).subscribe(alumno => {
        this.alumno = alumno;
        this.cursoService.obtenerCursoPorAlumnoId(this.alumno).subscribe(
          curso => {
            this.curso = curso;
            this.examenes = (curso && curso.examenes) ? curso.examenes : [];
            this.dataSource = new MatTableDataSource<Examen>(this.examenes);
            this.dataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
          }
        );
      });
    });    
  }

  responderExamen(examen: Examen): void {
    const modalRef = this.dialog.open(ResponderExamenModalComponent, {
      width: '750px',
      data: { curso: this.curso, alumno: this.alumno, examen: examen }
    });
    
    modalRef.afterClosed().subscribe(respuestas => {
      console.log('modal responder, exámen ha sido enviado y cerrado');
      console.log(respuestas);
    });
  }
}
