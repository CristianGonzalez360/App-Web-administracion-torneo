import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';
import { EdicionEquipoService } from '../servicios/edicionEquipo.service';
import { EquipoService } from '../servicios/equipo.service';

@Component({
  selector: 'app-equipos-por-categoria',
  templateUrl: './equipos-por-categoria.component.html',
  styleUrls: ['./equipos-por-categoria.component.css']
})
export class EquiposPorCategoriaComponent implements OnInit {

  @Input() categoria?: Categoria;

  equipos: Equipo[] = [];

  constructor(
    private serviciosEquipo: EquipoService,
    private serviciosEdicionEquipo: EdicionEquipoService
  ) { }

  ngOnInit(): void {
    this.getEquipos();
    this.serviciosEdicionEquipo.nuevoEquipo.subscribe(
      equipo => {
        if(this.categoria){
          if (equipo.categoria.id == this.categoria.id) {
            this.equipos.push(equipo);
          }
        }
      }
    )
  }

  getEquipos() {
    if (this.categoria) {
      this.serviciosEquipo.getEquiposByCategoria(this.categoria).subscribe(
        equipos => this.equipos = equipos
      )
    }
  }

}
