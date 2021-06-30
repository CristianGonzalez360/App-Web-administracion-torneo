import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  partidoUrl:string = 'http://localhost:8081/partido';

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
      tap((newPartido: Partido) => console.log(`added partido w/ id=${newPartido.id}`)),
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
      tap(_ => console.log(`updated Categoria id=${partido.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    )
  }
}
