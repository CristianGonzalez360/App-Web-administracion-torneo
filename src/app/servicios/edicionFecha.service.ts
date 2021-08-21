import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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
  nuevoPartido = this.source2.asObservable();

  private source3 = new Subject<boolean>();
  creando = this.source3.asObservable();

  private source4 = new BehaviorSubject<Equipo[]>([]);
  equiposDisponibles = this.source4.asObservable();

  private source5 = new Subject<Partido>();
  partidoBorrado = this.source5.asObservable();

  private source6 = new BehaviorSubject<string[]>([]);
  estadosPartidos = this.source6.asObservable();

  constructor(
  ) {}

  seleccionarFecha(fecha: Fecha): void {
    this.source.next(fecha);
  }

  setEquipos(equipos: Equipo[]): void {
    this.source4.next(this.ordenarEquipos(equipos));
  }

  addPartido(partido: Partido): void {
    this.source2.next(partido);
  }

  finCreacion() {
    this.source3.next(false);
  }

  borrarPartido(partido: Partido) {
    this.source5.next(partido);
  }

  ordenarEquipos(equipos: Equipo[]):Equipo[] {
    var ret:Equipo[] = [];
    ret = equipos.sort(function (a, b) {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
    return ret;
  }

  setEstados(estados:string[]){
    this.source6.next(estados);
  }
}
