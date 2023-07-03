import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialEquipo } from '../modelo/historialEquipo';
import { Tabla } from '../modelo/tabla';
import { Torneo } from '../modelo/torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  
  torneoUrl:string = environment.apiUrl + '/torneo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  add (torneo: Torneo):Observable<Torneo> {
    return this.http.post<Torneo>(this.torneoUrl, torneo, this.httpOptions).pipe(
      tap((newTorneo: Torneo) => console.log(`added Torneo w/ id=${newTorneo.id}`)),
      catchError(this.handleError<Torneo>('addTorneo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll():Observable<Torneo[]>{
    return this.http.get<Torneo[]>(this.torneoUrl).pipe(
      tap((torneos:Torneo[]) => console.log(`fetched Torneos`)),
      catchError(this.handleError<Torneo[]>(`fetch Torneos`))
    )
  }

  get(id: number):Observable<Torneo> {
    const url = `${this.torneoUrl}/${id}`;
    return this.http.get<Torneo>(url).pipe(
      tap(_ => console.log(`fetched Torneo id=${id}`)),
      catchError(this.handleError<Torneo>(`getTorneo id=${id}`))
    );
  }

  getTabla(idTorneo:number):Observable<Tabla[]>{
   const url = environment.apiUrl + `/tabla/${idTorneo}`;
   return this.http.get<Tabla[]>(url).pipe(
    tap(_ => console.log(`fetched Tabla`)),
    catchError(this.handleError<Tabla[]>(`getTabla`))
    );
  }

  getHistorialTorneo(idEquipo:number, idTorneo:number):Observable<HistorialEquipo>{
  const url = `${this.torneoUrl}/historialEquipo/${idEquipo}/${idTorneo}`;
    return this.http.get<HistorialEquipo>(url).pipe(
     tap(_ => console.log(`fetched Partidos por Equipo y Torneo`)),
     catchError(this.handleError<HistorialEquipo>('fetch Partidos por Equipo y Torneo'))
    );
  }

  delete(idTorneo:number):Observable<Torneo>{
    const url = `${this.torneoUrl}/${idTorneo}`;
    return this.http.delete<Torneo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Torneo id=${idTorneo}`)),
      catchError(this.handleError<Torneo>('delete Equipo'))
    );
  }
}
