import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tabla } from '../modelo/tabla';
import { Torneo } from '../modelo/torneo';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  
  torneoUrl:string = "http://localhost:8081/torneo";

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
   const url = `http://localhost:8081/tabla/${idTorneo}`;
   return this.http.get<Tabla[]>(url).pipe(
    tap(_ => console.log(`fetched Tabla`)),
    catchError(this.handleError<Tabla[]>(`getTabla`))
  );
 }
}
