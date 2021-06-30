import { Component, Input, OnInit } from '@angular/core';
import { Tabla } from '../modelo/tabla';
import { TorneoService } from '../servicios/torneo.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() tabla?:Tabla;
 
  constructor(
    private serviciosTorneo:TorneoService
  ) { }

  ngOnInit(): void {
 
  }
}
