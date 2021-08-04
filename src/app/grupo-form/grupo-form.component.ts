import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';
import { Grupo } from '../modelo/grupo';
import { EquipoService } from '../servicios/equipo.service';
import { EdicionTorneoService } from '../servicios/edicionTorneo.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {

  @Input() grupo?: Grupo;

  equipos: Equipo[] = [];

  equipoSeleccionado?: Equipo;

  hayEquipos: boolean = false;

  constructor(
    private servicioEdicionTorneo: EdicionTorneoService
  ) { }

  ngOnInit(): void {
    this.cargarEquiposDisponibles();
    this.servicioEdicionTorneo.categoriaSeleccionada.subscribe(categoria => {
      if (this.grupo && this.grupo.equipos.length && this.grupo.equipos[0].categoria.id != categoria.id) {
        this.grupo.equipos = [];
      }
    });
  }

  cargarEquiposDisponibles() {
    this.servicioEdicionTorneo.equiposDisponibles.subscribe(equipos => {
      this.equipos = equipos;      
      if (this.equipos.length) {
        this.equipoSeleccionado = this.equipos[0];
        this.hayEquipos = true;
      } else {
        this.hayEquipos = false;
      }
    })
  }

  addEquipo() {
    if (this.grupo && this.equipoSeleccionado && this.equipos.length) {
      this.grupo.equipos.push(this.equipoSeleccionado);
      this.servicioEdicionTorneo.quitarEquipo(this.equipoSeleccionado);
    }
  }

  removeEquipo(equipo: Equipo) {
    if (this.grupo) {
      this.grupo.equipos = this.grupo.equipos.filter(equipo2 => equipo.id != equipo2.id);
      this.servicioEdicionTorneo.agregarEquipo(equipo);
    }
  }

  quitarGrupo() {
    if (this.grupo) {
      this.servicioEdicionTorneo.quitarGrupo(this.grupo);
    }
  }
}
