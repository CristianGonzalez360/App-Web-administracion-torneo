import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Categoria } from '../modelo/categoria';
import { Equipo } from '../modelo/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  equipoUrl: string = 'http://localhost:8081/equipo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.equipoUrl).pipe(
      tap(_ => console.log('fetched Equipos')),
      catchError(this.handleError<Equipo[]>('getEquipos', []))
    );
  }

  add(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.equipoUrl, equipo, this.httpOptions).pipe(
      tap((newEquipo: Equipo) => console.log(`added Equipo w/ id=${newEquipo.id}`)),
      catchError(this.handleError<Equipo>('addEquipo'))
    );
  }

  edit(equipo: Equipo): Observable<any> {
    return this.http.put(this.equipoUrl, equipo, this.httpOptions).pipe(
      tap(_ => console.log(`updated Equipo id=${equipo.id}`)),
      catchError(this.handleError<any>('updateEquipo'))
    )
  }

  delete(id: number): Observable<Equipo> {
    const url = `${this.equipoUrl}/${id}`;
    return this.http.delete<Equipo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Equipo id=${id}`)),
      catchError(this.handleError<Equipo>('deleteEquipo'))
    );
  }

  get(id: number): Observable<Equipo> {
    const url = `${this.equipoUrl}/${id}`;
    return this.http.get<Equipo>(url).pipe(
      tap(_ => console.log(`fetched Equipo id=${id}`)),
      catchError(this.handleError<Equipo>(`getEquipo id=${id}`))
    );
  }

  getEquiposByCategoria(categoria: Categoria): Observable<Equipo[]> {
    const url = `${this.equipoUrl}/porCategoria/${categoria.id}`;
    return this.http.get<Equipo[]>(url).pipe(
      tap(_ => console.log(`fetched Equipos por Categoria id=${categoria.id}`)),
      catchError(this.handleError<Equipo[]>(`get Equipos por Categoria id=${categoria.id}`, []))
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
