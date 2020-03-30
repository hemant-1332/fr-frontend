import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from '../models/person';
import { FacePhoto } from '../models/face-photo';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FrApiService {
  private peopleUrl = environment.peopleUrl;  
  private findFacesUrl = environment.findFacesUrl;
  private peopleTrainingUrl = environment.peopleTrainingUrl;
  private loginUrl = environment.tokenUrl;
  //DJANGO_SERVER: string = "http://127.0.0.1:8000";

  constructor(
    private http: HttpClient,
  ) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl);
  }

  login(username: string, password: string): Observable<any>{
    const user = {
      username: username,
      password: password,
    };

    return this.http.post<any>(`${this.loginUrl}`,user).pipe(
      tap((data: any) => console.log(`received token=${data.token}`)),
      catchError(this.handleError<Person>('Login'))
    )
  }

  addPhoto(name: string, photo: string, isExisting: boolean): Observable<Person> {
    const person = {
      name: name,
      photoBase64: photo,
      isExisting: isExisting
    };

    return this.http.post<any>(`${this.peopleUrl}`, person).pipe(        
        tap((person1: Person) => console.log(`added person w/ id=${person1.id}`)),
        catchError(this.handleError<Person>('addPhoto'))
    );
  }

  trainModel(): Observable<any>{
    return this.http.get<any>(`${this.peopleTrainingUrl}`).pipe(
      tap((person1: Person) => console.log(`training done}`)),
        catchError(this.handleError<Person>('addPhoto'))
    )
  }

  deletePerson(id: string): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;

    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  findAllInImage(photoBase64: string) {
    return this.http.post<FacePhoto>(this.findFacesUrl, photoBase64).pipe(
      tap(_ => console.log(_)),
      catchError(this.handleError<FacePhoto>('findAllInImage'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
