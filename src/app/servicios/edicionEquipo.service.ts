import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Equipo } from '../modelo/equipo';

@Injectable({
  providedIn: 'root'
})
export class EdicionEquipoService {

  private source = new Subject<Equipo>();
  nuevoEquipo = this.source.asObservable();

  constructor() { }

  agregarEquipo(equipo:Equipo){
    this.source.next(equipo);
  }
}
