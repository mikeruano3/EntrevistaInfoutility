import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  url = environment.apiUrl + '/values';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  register(person: Person) {
    return this.http.post<any>(this.url, person);
  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url)
                    .pipe(catchError(this.errorHandler));
  }

  getPerson(id: any): Observable<Person> {
    return this.http.get<Person>(this.url + '/' + id)
                    .pipe(catchError(this.errorHandler));
  }

  editPerson(person: Person): Observable<any> {
    return this.http.put(this.url + '/' + person.id, person, this.httpOptions)
                    .pipe(catchError(this.errorHandler));
  }

  deletePerson(id: any) {
    return this.http.delete(this.url + '/' + id)
                    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error!');
  }

}
