import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { CategoriaService } from '../servicios/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias:Categoria[] = [];

  constructor(
    private serviciosCategoria:CategoriaService 
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.serviciosCategoria.getAll()
    .subscribe(categorias => this.categorias = categorias);
  }
  
  add(nombre:string){
    nombre = nombre.trim();
    if(nombre){
      this.serviciosCategoria.add({nombre} as Categoria)
      .subscribe(categoria => {
        this.categorias.push(categoria)
      })
    }
  }
}
