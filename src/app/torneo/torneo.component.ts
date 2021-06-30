import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../modelo/equipo';
import { Fecha } from '../modelo/fecha';
import { Tabla } from '../modelo/tabla';
import { Torneo } from '../modelo/torneo';
import { EdicionFechaService } from '../servicios/edicionFecha.service';
import { FechaService } from '../servicios/fecha.service';
import { TorneoService } from '../servicios/torneo.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {

  torneo?: Torneo;
  fechas: Fecha[] = [];
  tablas: Tabla[] = [];

  constructor(
    private route: ActivatedRoute,
    private serviciosTorneo: TorneoService,
    private serviciosFecha: FechaService,
    private serviciosEdicionFecha: EdicionFechaService,
  ) { }

  ngOnInit(): void {
    this.getTorneo();
  }

  getTorneo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviciosTorneo.get(id).subscribe(torneo => {
      this.torneo = torneo;
      //this.ordenarGrupos();
      this.cargarTabla();
      this.getFechas(torneo.id);
      let equipos: Equipo[] = [];
      torneo.grupos.forEach(grupo => grupo.equipos.forEach(equipo => equipos.push(equipo)));
      this.serviciosEdicionFecha.setEquipos(equipos);
    });
  }

  getFechas(idTorneo: number): void {
    this.serviciosFecha.getFechaByTorneo(idTorneo).subscribe(fechas => this.fechas = fechas)
  }

  addFecha() {
    if (this.torneo) {
      this.serviciosFecha.add({ id: 0, numero: (this.fechas.length + 1), idTorneo: this.torneo.id } as Fecha).subscribe(
        fecha => this.fechas.push(fecha)
      )
    }
  }

  editar(fecha: Fecha) {
    this.serviciosEdicionFecha.seleccionarFecha(fecha);
  }

  cargarTabla() {
    if (this.torneo) {
      this.serviciosTorneo.getTabla(this.torneo.id).subscribe(tablas => this.tablas = tablas);
    }
  }

  ordenarGrupos() {
    if (this.torneo) {
      this.torneo.grupos = this.torneo.grupos.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    }
  }
}
