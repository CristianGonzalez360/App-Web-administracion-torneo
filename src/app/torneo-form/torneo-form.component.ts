import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Torneo } from '../modelo/torneo';
import { CategoriaService } from '../servicios/categoria.service';
import { EdicionTorneoService } from '../servicios/edicionTorneo.service';
import { TorneoService } from '../servicios/torneo.service';
import { Location } from '@angular/common';
import { Grupo } from '../modelo/grupo';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../modelo/equipo';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneo-form.component.html',
  styleUrls: ['./torneo-form.component.css']
})
export class TorneosFormComponent implements OnInit {

  categorias: Categoria[] = [];

  torneo: Torneo = { id: 0, nombre: "", categoria: {} as Categoria, fechaInicio: new Date(), grupos: [] } as Torneo;

  private nombreGrupo: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  private nombresBorrados:string[] = [];

  constructor(
    private serviciosCategoria: CategoriaService,
    private serviciosTorneo: TorneoService,
    private serviciosEdicionTorneo: EdicionTorneoService,
    private location: Location,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.serviciosEdicionTorneo.grupoBorrado.subscribe(grupo => {
      this.torneo.grupos = this.torneo.grupos.filter(grupo2 => grupo.nombre != grupo2.nombre);
      this.nombresBorrados.push(grupo.nombre);
    });
  }

  getTorneo(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.serviciosTorneo.get(id).subscribe(torneo =>{
        this.torneo = torneo;
        this.serviciosEdicionTorneo.setTorneo(this.torneo);
        this.seleccionar(this.torneo.categoria);
      });
    }
    else{
      if (this.categorias.length > 0) {
        this.torneo.categoria = this.categorias[0];
        this.seleccionar(this.categorias[0]);
      }
    }
  }

  getCategorias(): void {
    this.serviciosCategoria.getAll().subscribe(categorias => {
      this.categorias = categorias;
      this.getTorneo();
    });
  }

  add(): void {
    this.torneo.nombre = this.torneo.nombre.trim();
    this.serviciosTorneo.add(this.torneo).subscribe(_ => this.volver());
  }

  addGrupo() {
    if (this.torneo.grupos.length < this.nombreGrupo.length) {
      var nombreGrupo:string|undefined;
      if(this.nombresBorrados.length){
        nombreGrupo = this.nombresBorrados[0];
        this.nombresBorrados = this.nombresBorrados.filter(nombre => nombre!=nombreGrupo);
      } else {
        nombreGrupo = this.nombreGrupo[this.torneo.grupos.length]
      }
      this.torneo.grupos.push({ id: 0, nombre:nombreGrupo, equipos: [] } as Grupo);
    }
  }

  seleccionar(categoria: Categoria): void {
    this.serviciosEdicionTorneo.seleccionar(categoria);
  }

  volver(): void {
    this.location.back();
  }

  comparar(categoria1: Categoria,categoria2:Categoria):boolean{
    return categoria1.id==categoria2.id;
  }
}
