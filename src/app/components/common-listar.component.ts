import { OnInit, ViewChild, Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
//import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Injectable()
export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: string;
  lista: E[];
  protected nombreModel: string;
                      
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;

  constructor(protected service: S) { }

  ngOnInit() {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos() {
     this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
      .subscribe(p => 
      {
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
      });
  }

  public eliminar(e: E): void {
    Swal.fire({
      title: "Cuidado!",
      text: `Seguro que desea eliminar a ${e.nombre} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() => {
          this.calcularRangos();
          Swal.fire('Eliminado', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success');
        });
      }
    });
  }
}