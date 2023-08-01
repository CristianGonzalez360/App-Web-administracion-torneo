import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';
import { Grupo } from '../modelo/grupo';
import { Torneo } from '../modelo/torneo';
import { EquipoService } from './equipo.service';

@Injectable({
  providedIn: 'root'
})
export class EdicionTorneoService {
  
  private source = new BehaviorSubject<Equipo[]>([]);
  equiposDisponibles:Observable<Equipo[]> = this.source.asObservable();

  private source2 = new BehaviorSubject<Categoria>({} as Categoria);
  categoriaSeleccionada:Observable<Categoria> = this.source2.asObservable();

  private source3 = new Subject<Grupo>();
  grupoBorrado:Observable<Grupo> = this.source3.asObservable();

  private torneo?:Torneo;
  private categoria?:Categoria;
  private equipos:Equipo[]=[];
  
  constructor(
    private servicioEquipos:EquipoService
  ) {}
  
  seleccionar(categoria: Categoria) {
    this.source2.next(categoria);
    this.categoria = categoria;
    this.cargarEquipos();
  }

  quitarEquipo(equipo: Equipo) {
    console.log(equipo);
    this.equipos = this.equipos.filter(equipo2 => equipo2.id != equipo.id);
    this.source.next(this.equipos);
  }

  agregarEquipo(equipo:Equipo){
    this.equipos.push(equipo);
    this.source.next(this.equipos);
  }

  cargarEquipos(){
    if (this.categoria) {
      this.servicioEquipos.getEquiposByCategoria(this.categoria).subscribe(equipos => {
        this.equipos = equipos;
        if(this.torneo){
          this.torneo.grupos.forEach(grupo => grupo.equipos.forEach(equipo => this.quitarEquipo(equipo)));   
        }
        this.source.next(this.equipos);
      })
    }
  }

  quitarGrupo(grupo:Grupo){
    this.source3.next(grupo);
  }

  setTorneo(torneo:Torneo){
    this.torneo = torneo;

  }
}
