import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService<T>{

  url:string = "";

  constructor(

    private http:HttpClient
  ) { }
  
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
        tap(_ => console.log('fetched Categorias')),
        catchError(this.handleError<T[]>('get', []))
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
