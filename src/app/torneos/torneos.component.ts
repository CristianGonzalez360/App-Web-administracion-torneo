import { Component, OnInit } from '@angular/core';
import { Torneo } from '../modelo/torneo';
import { TorneoService } from '../servicios/torneo.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css']
})
export class TorneosComponent implements OnInit {

  torneos:Torneo[]=[];

  constructor(
    private serviciosTorneo:TorneoService
  ) { }

  ngOnInit(): void {
    this.serviciosTorneo.getAll().subscribe(torneos => this.torneos=torneos);

  }

  borrar(borrado:Torneo){

    this.serviciosTorneo.delete(borrado.id).subscribe(eliminado => 
      this.torneos = this.torneos.filter(torneo => torneo.id != eliminado.id)
    )
    console.log("borrado");
  }



}
