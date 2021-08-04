import { Component, Input, OnInit } from '@angular/core';
import { Equipo } from '../modelo/equipo';
import { Fecha } from '../modelo/fecha';
import { Partido } from '../modelo/partido';
import { EdicionFechaService } from '../servicios/edicionFecha.service';
import { PartidoService } from '../servicios/partido.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  @Input() partido?:Partido;

  @Input() creacion:boolean = false;
  edicion:boolean = false;

  equipos:Equipo[] = []
  @Input() fecha?:Fecha;
  
  constructor(
    private serviciosPartido:PartidoService,
    private serviciosEdicionFecha:EdicionFechaService
  ) { }

  ngOnInit(): void {
    this.serviciosEdicionFecha.fechaSeleccionada.subscribe(fecha => this.fecha = fecha);
    if(this.creacion){
      this.partido = {golesLocal:0,golesVisitante:0,fechaJugado: new Date()} as Partido;
      this.serviciosEdicionFecha.equiposDisponibles.subscribe(equipos => {
        this.equipos = equipos;
        if(this.equipos.length && this.partido){
          this.partido.local = this.equipos[0];
          this.partido.visitante = this.equipos[0];
        }
      });
    }
  }

  addPartido():void{
    if(this.partido && this.fecha){
      this.partido.fecha = this.fecha;
      this.serviciosPartido.add(this.partido).subscribe(partido =>{
        this.serviciosEdicionFecha.addPartido(partido);
        this.serviciosEdicionFecha.finCreacion();
      })
    }
  }

  editar(){
    if(this.partido){
      this.edicion = true;
    }
  }

  guardar(){
    if(this.partido){
      this.serviciosPartido.update(this.partido).subscribe(_ => this.edicion=false);
    }
  }

  eliminar(){
    if(this.partido){
      this.serviciosPartido.delete(this.partido.id).subscribe(_ => {
        if(this.partido){
          this.serviciosEdicionFecha.borrarPartido(this.partido);
        }
        this.edicion=false;
      });
    }
  }
}
