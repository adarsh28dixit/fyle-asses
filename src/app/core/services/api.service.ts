import { Inject, Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { HttpClient } from '@angular/common/http';
import { BookResponse } from '../models/book-response.model';

const ROOT_URL = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) {}

  get<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.get<T>(apiPath, config);
  }

  post<T>(url: string, body: Record<string, any> = {}, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.post<T>(apiPath, body, config);
  }

  delete<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.delete<T>(apiPath, config);
  }

  searchBooks(searchTerm: string): Observable<BookResponse> {
    const url = `${ROOT_URL}/search.json?q=${searchTerm}`;
    return this.httpClient.get<any>(url);
  }
}
