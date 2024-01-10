import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken = '';
  private userId = '';

  constructor(private http: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('http://localhost:3000/', { email, password });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    return this.http.post<{ userId: string, token: string }>('http://localhost:3000/login', { email, password }).pipe(
      tap(({ userId, token }) => {
        this.userId = userId;
        this.authToken = token;
        this.isAuth$.next(true);
      }),
      catchError(error => {
        console.error(error);
        this.isAuth$.next(false);
        return EMPTY;
      })
    );
  }

  logout(): void {
    this.authToken = '';
    this.userId = '';
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}