import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BACK_END_BASE_URL="http://localhost:3000";
  BOOKS_API_BASE_URL="https://openlibrary.org"
  MOVIES_API_BASE_URL="https://api.themoviedb.org/3";
  moviesApikey;
  language;
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.moviesApikey = 'cceb46f4d5f8edb2af6f99e92db477ce';
    this.language = 'pt-br';
  }

  private get<T>(url: string, params?: any): Observable<T> {
    const headers = this.httpOptions;
    return this.http.get<T>(`${url}`, { headers, params });
  }

  private post<T>(url: string, data: any): Observable<any> {
    return this.http.post<T>(`${url}`, data, { headers:this.httpOptions })
    .pipe(catchError(this.handleError));
  }

  private handleError(error: Error | HttpErrorResponse) {
    return throwError(error.message);
  }

  getMovieByName(movieName: string): Observable<any> {
    return this.get(
      `${this.MOVIES_API_BASE_URL}/search/movie`,
      {
        api_key: this.moviesApikey,
        query: movieName,
        language: this.language,
        per_page: 5
      });
  }

  getMovieDetails(id: string): Observable<any> {
    return this.get(`${this.MOVIES_API_BASE_URL}/movie/${id}`,
    {
      api_key: this.moviesApikey,
      language: this.language,
      per_page: 5
    });
  }

  getTvShowByName(movieName: string): Observable<any> {
    return this.get(
      `${this.MOVIES_API_BASE_URL}/search/tv`,
      {
        api_key: this.moviesApikey,
        query: movieName,
        language: this.language,
        per_page: 5
      });
  }

  getTvShowDetails(id: string): Observable<any> {
    return this.get(`${this.MOVIES_API_BASE_URL}/tv/${id}`,
    {
      api_key: this.moviesApikey,
      language: this.language,
      per_page: 5
    });
  }

  getBookByName(bookName: string): Observable<any> {
    return this.http.get(`${this.BOOKS_API_BASE_URL}/search.json`, { params: { title: bookName, limit: 5 }});
  }

  getExternalBookById(id: string): Observable<any> {
    return this.http.get(`${this.BOOKS_API_BASE_URL}/api/books?bibkeys=ISBN:${id}&format=json&jscmd=data`);
  }

  postMedia(type: string, mediaId: string): Observable<any> {
    console.log(`Posting ${type} - ${mediaId}`);
    return this.post(`${this.BACK_END_BASE_URL}/medias/insert`, {type, mediaId});
  }

  getMedia(mediaId: string): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/medias/${mediaId}`);
  }

  getAllMovies(): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/movies`);
  }

  getAllSeries(): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/series`);
  }

  getAllBooks(): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/books`);
  }

  getMovieById(id: string): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/movies/${id}`);
  }

  getSerieById(id: string): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/series/${id}`);
  }

  getBookById(id: string): Observable<any> {
    return this.get(`${this.BACK_END_BASE_URL}/books/'${id}'`);
  }

  addMovie(post: any): Observable<any> {
    return this.post(`${this.BACK_END_BASE_URL}/movies`, post);
  }

  addSerie(post: any): Observable<any> {
    return this.post(`${this.BACK_END_BASE_URL}/series`, post);
  }

  addBook(post: any): Observable<any> {
    return this.post(`${this.BACK_END_BASE_URL}/books`, post);
  }

  removeMovieById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BACK_END_BASE_URL}/movies/${id}`);
  }

  removeSerieById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BACK_END_BASE_URL}/series/${id}`);
  }

  removeBookById(id: string): Observable<any> {
    this.getAllBooks().subscribe(nxt => console.log(nxt));
    return this.http.delete<any>(`${this.BACK_END_BASE_URL}/books/${encodeURIComponent(id)}`);
  }
}
