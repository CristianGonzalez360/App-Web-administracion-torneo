import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EquipoFormComponent } from './equipo-form/equipo-form.component';
import { EquiposComponent } from './equipos/equipos.component';
import { HistorialPartidosComponent } from './historial-partidos/historial-partidos.component';
import { TorneosFormComponent } from './torneo-form/torneo-form.component';
import { TorneoComponent } from './torneo/torneo.component';
import { TorneosComponent } from './torneos/torneos.component';


const routes: Routes = [
  {path : 'categorias' , component:CategoriasComponent},
  {path : 'categorias/editar/:id' , component:CategoriaFormComponent},
  {path : 'equipos', component:EquiposComponent},
  {path : 'equipos/editar/:id' , component:EquipoFormComponent},
  {path : 'torneo' , component:TorneosComponent},
  {path : 'torneo/nuevo', component:TorneosFormComponent},
  {path : 'torneo/fechas/:id', component:TorneoComponent},
  {path : 'torneo/editar/:id', component:TorneosFormComponent},
  {path : 'torneo/historial/:idEquipo/:idTorneo', component:HistorialPartidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
