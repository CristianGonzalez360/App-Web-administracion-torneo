import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import {CategoriaService} from "../servicios/categoria.service"
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  @Input() categoria:Categoria = {id:0,nombre:""};

  constructor(
    private serviciosCategoria:CategoriaService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit():void{
    this.getCategoria();
  }

  getCategoria(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviciosCategoria.get(id)
      .subscribe(categoria => this.categoria = categoria);
  }

  guardar(){
    if(this.categoria){
      this.serviciosCategoria.edit(this.categoria)
      .subscribe(_ => this.volver());
    }
  }

  volver(): void {
    this.location.back();
  }
}
