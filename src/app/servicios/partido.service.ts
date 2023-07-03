import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  
  partidoUrl:string = environment.apiUrl + '/partido';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient
  ) { }

  getPartidosByFecha(idFecha:number):Observable<Partido[]>{
    const url = `${this.partidoUrl}/porFecha/${idFecha}`;
    return this.http.get<Partido[]>(url).pipe(
      tap(_ => console.log(`fetched Partidos por Fecha`)),
      catchError(this.handleError<Partido[]>('fetch Partidos por Fecha'))
    )

  }

  add(partido:Partido):Observable<Partido>{
    return this.http.post<Partido>(this.partidoUrl, partido, this.httpOptions).pipe(
      tap((newPartido: Partido) => console.log(`added Partido w/ id=${newPartido.id}`)),
      catchError(this.handleError<Partido>('addPartido'))
    )
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

  update(partido:Partido):Observable<Partido>{
    return this.http.put<Partido>(this.partidoUrl,partido,this.httpOptions).pipe(
      tap(_ => console.log(`updated Equipo id=${partido.id}`)),
      catchError(this.handleError<any>('update Equipo'))
    )
  }

  delete(id: number):Observable<Partido>{
    const url = `${this.partidoUrl}/${id}`;
    return this.http.delete<Partido>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Equipo id=${id}`)),
      catchError(this.handleError<Partido>('delete Equipo'))
    );
  }

  getEstados():Observable<string[]>{
    const url = `${this.partidoUrl}/estados`;
    return this.http.get<string[]>(url).pipe(
      tap(_ => console.log(`fetched Estados partido`)),
      catchError(this.handleError<string[]>('fetch Estados partido'))
    )
  }
}
