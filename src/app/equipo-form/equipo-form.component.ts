import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';
import { EquipoService } from '../servicios/equipo.service';
import { Location } from '@angular/common';
import { CategoriaService } from '../servicios/categoria.service';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css']
})
export class EquipoFormComponent implements OnInit {

  equipo:Equipo = {id:0,nombre:"",categoria:{id:0, nombre:""}};

  categorias:Categoria[] = [];

  constructor(
    private serviciosEquipo:EquipoService,
    private serviciosCategoria:CategoriaService,
    private route:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.getEquipo();
    this.serviciosCategoria.getAll().subscribe(categorias => this.categorias=categorias);
  }

  getEquipo(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviciosEquipo.get(id)
      .subscribe(equipo => this.equipo=equipo);
  }

  editar(){
    if(this.equipo){
      this.serviciosEquipo.edit(this.equipo)
      .subscribe(_ => this.volver());
    }
  }

  volver(): void {
    this.location.back();
  }

  comparar(categoria1:Categoria, catrgoria2:Categoria):boolean{
    return categoria1.id==catrgoria2.id;
  }
}
