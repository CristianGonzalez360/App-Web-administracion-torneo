import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Fecha } from '../modelo/fecha';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  fechaUrl:string = 'http://localhost:8081/fecha';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient
  ) { }


  add (fecha: Fecha):Observable<Fecha> {
    return this.http.post<Fecha>(this.fechaUrl, fecha, this.httpOptions).pipe(
      tap((newFecha: Fecha) => console.log(`added Fecha w/ id=${newFecha.id}`)),
      catchError(this.handleError<Fecha>('addFecha'))
    );
  }

  getFechaByTorneo(idTorneo:number):Observable<Fecha[]>{
    const url = `${this.fechaUrl}/porTorneo/${idTorneo}`;
    return this.http.get<Fecha[]>(url).pipe(
      tap(fechas => console.log(`fetched Fechas by Torneo`)),
      catchError(this.handleError<Fecha[]>('fetch Fechas by Torneo'))
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

}
