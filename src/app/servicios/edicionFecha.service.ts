import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Equipo } from '../modelo/equipo';
import { Fecha } from '../modelo/fecha';
import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class EdicionFechaService {
  
  private source = new Subject<Fecha>();
  fechaSeleccionada = this.source.asObservable();

  private source2 = new Subject<Partido>();
  nuevoPartido  = this.source2.asObservable();

  private source3 = new Subject<boolean>();
  creando = this.source3.asObservable();

  private source4 = new BehaviorSubject<Equipo[]>([]);
  equiposDisponibles = this.source4.asObservable();

  private source5 = new Subject<Partido>();
  equipoBorrado = this.source5.asObservable();

  constructor(
    
  ) { }

  seleccionarFecha(fecha:Fecha):void{
    this.source.next(fecha);
  }

  setEquipos(equipos:Equipo[]):void{
    this.source4.next(equipos);
  }

  addPartido(partido:Partido):void{
    this.source2.next(partido);
  }

  finCreacion() {
    this.source3.next(false);
  }

  borrarPartido(partido:Partido){
    this.source5.next(partido);
  }
}
