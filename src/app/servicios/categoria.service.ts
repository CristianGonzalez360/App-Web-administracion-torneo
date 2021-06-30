import { Injectable } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriaUrl:string = 'http://localhost:8081/categoria';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  add(categoria:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.categoriaUrl, categoria, this.httpOptions).pipe(
      tap((newCategoria: Categoria) => console.log(`added hero w/ id=${newCategoria.id}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
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

  edit(categoria: Categoria): Observable<any>{
    return this.http.put(this.categoriaUrl, categoria, this.httpOptions).pipe(
      tap(_ => console.log(`updated Categoria id=${categoria.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    )
  }

  delete(id: number): Observable<Categoria> {
    const url = `${this.categoriaUrl}/${id}`;
    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Categoria id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  get(id: number): Observable<Categoria> {
    const url = `${this.categoriaUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => console.log(`fetched Categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUrl).pipe(
        tap(_ => console.log('fetched Categorias')),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
      );
  }
}
