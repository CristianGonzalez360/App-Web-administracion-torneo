import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CategoriasComponent } from './categorias/categorias.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquipoFormComponent } from './equipo-form/equipo-form.component';
import { MenuComponent } from './menu/menu.component';
import { EquiposPorCategoriaComponent } from './equipos-por-categoria/equipos-por-categoria.component';
import { TorneosFormComponent } from './torneo-form/torneo-form.component';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { TorneosComponent } from './torneos/torneos.component';
import { TorneoComponent } from './torneo/torneo.component';
import { FechaComponent } from './fecha/fecha.component';
import { PartidoComponent } from './partido/partido.component';
import { TablaComponent } from './tabla/tabla.component';
import { GrupoComponent } from './grupo/grupo.component';
import { HistorialPartidosComponent } from './historial-partidos/historial-partidos.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaFormComponent,
    CategoriasComponent,
    EquiposComponent,
    EquipoFormComponent,
    MenuComponent,
    EquiposPorCategoriaComponent,
    TorneosFormComponent,
    GrupoFormComponent,
    TorneosComponent,
    TorneoComponent,
    FechaComponent,
    PartidoComponent,
    TablaComponent,
    GrupoComponent,
    HistorialPartidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
