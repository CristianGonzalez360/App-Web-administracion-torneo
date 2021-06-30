import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';
import { CategoriaService } from '../servicios/categoria.service';
import { EdicionEquipoService } from '../servicios/edicionEquipo.service';
import { EquipoService } from '../servicios/equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  equipo:Equipo = {id:0,nombre:"",categoria:{id:0,nombre:""}};

  categorias:Categoria[] = [];

  constructor(
    private serviciosCategoria:CategoriaService,
    private serviciosEquipo:EquipoService,
    private seviciosEdicionEquipo:EdicionEquipoService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.serviciosCategoria.getAll().subscribe(categorias => {
      this.categorias=categorias;
      if(this.categorias.length>0){
        this.equipo.categoria = this.categorias[0];
      }
    });
  }

  add(){
    this.equipo.nombre = this.equipo.nombre.trim();
    if(this.equipo.nombre){
      this.serviciosEquipo.add(this.equipo).subscribe(
        equipo => this.seviciosEdicionEquipo.agregarEquipo(equipo)
      )
    }
  }
}
