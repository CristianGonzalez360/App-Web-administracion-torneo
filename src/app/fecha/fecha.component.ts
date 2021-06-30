import { Component, OnInit } from '@angular/core';
import { Fecha } from '../modelo/fecha';
import { Partido } from '../modelo/partido';
import { EdicionFechaService } from '../servicios/edicionFecha.service';
import { PartidoService } from '../servicios/partido.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  fecha?:Fecha;
  partidos:Partido[] = [];
  nuevo:boolean = false;
  
  constructor(
    private serviciosEdicionFecha:EdicionFechaService,
    private serviciosPartidos:PartidoService
  ) { }

  ngOnInit(): void {
    this.serviciosEdicionFecha.fechaSeleccionada.subscribe(fecha => {
      this.fecha = fecha;
      this.cargarPartidos();
    })
    this.serviciosEdicionFecha.nuevoPartido.subscribe(partido => this.partidos.push(partido));
    this.serviciosEdicionFecha.creando.subscribe(creando => this.nuevo = creando);
  }

  cargarPartidos(){
    if(this.fecha) {
      this.serviciosPartidos.getPartidosByFecha(this.fecha.id).subscribe(
        partidos => this.partidos = partidos);
    }
  }

  agregarPartido(){
    this.nuevo = true;
  }

  cancelar(){
    this.nuevo = false;
  }
}
