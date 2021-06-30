import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from '../modelo/grupo';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  @Input() grupo?:Grupo;
  
  constructor() { }

  ngOnInit(): void {
  }

}
