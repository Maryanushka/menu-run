import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Dishes } from '../models/Dishes';
import { Observable, of,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ApiService {

  // apiUrl: string = `${environment.apiUrl}/todos`;

  // constructor(private http: HttpClient ) {
  // }

  // public getAllDishes(): Observable<Dishes[]> {
  //   return this.http.get<Dishes[]>(this.apiUrl);
  // }

  // public createDishes(dishes: Dishes): Observable<Dishes> {
  //   return this.http.post<Dishes>(this.apiUrl, dishes, httpOptions);
  // }


  // public getDishesById(itemId: number): Observable<Dishes> {
  //   const url = `${this.apiUrl}/${itemId}`;
  //   return this.http.get<Dishes>(url);
  // }

  // public updateDishes(itemId: Dishes): Observable<Dishes> {
  //   const url = `${this.apiUrl}/${itemId}`;
  //   return this.http.get<Dishes>(url);
  // }

  // public deleteTodoById(itemId: number): Observable<null> {
  //   return this.http
  //     .delete(`${this.apiUrl}/${itemId}`).pipe(
  //       map(response => null),
  //       catchError(this.handleError)
  //     )
      
  // }

  // private handleError(error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   return throwError(error) as any;
  // }

}