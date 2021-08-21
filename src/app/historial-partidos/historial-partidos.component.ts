import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilaTabla } from '../modelo/filaTabla';
import { HistorialEquipo } from '../modelo/historialEquipo';
import { Partido } from '../modelo/partido';
import { EdicionFechaService } from '../servicios/edicionFecha.service';
import { PartidoService } from '../servicios/partido.service';
import { TorneoService } from '../servicios/torneo.service';

@Component({
  selector: 'app-historial-partidos',
  templateUrl: './historial-partidos.component.html',
  styleUrls: ['./historial-partidos.component.css']
})
export class HistorialPartidosComponent implements OnInit {

  historial?:HistorialEquipo;

  constructor(
    private serviciosTorneo:TorneoService,
    private serviciosPartido:PartidoService,
    private servicioEdicionFecha:EdicionFechaService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getHistorial();
    this.serviciosPartido.getEstados().subscribe(estados => this.servicioEdicionFecha.setEstados(estados))
  }

  getHistorial(){
    const idEquipo = Number(this.route.snapshot.paramMap.get('idEquipo'));
    const idTorneo = Number(this.route.snapshot.paramMap.get('idTorneo'))
    this.serviciosTorneo.getHistorialTorneo(idEquipo,idTorneo).subscribe(historial => this.historial = historial);
  }

}
