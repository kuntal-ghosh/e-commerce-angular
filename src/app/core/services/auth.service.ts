import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginCredentials, RegisterCredentials, AuthResponse, AuthState } from '../models/auth.interface';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  constructor(private http: HttpClient) {
    this.loadAuthState();
  }

  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth');
    }
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  private handleAuthSuccess(response: AuthResponse): void {
    if (this.isBrowser()) {
      localStorage.setItem('auth', JSON.stringify(response));
    }
    this.authStateSubject.next({
      isAuthenticated: true,
      user: response.user,
      token: response.token
    });
  }

  private loadAuthState(): void {
    if (this.isBrowser()) {
      const authState = localStorage.getItem('auth');
      if (authState) {
        this.authStateSubject.next(JSON.parse(authState));
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Server returned code ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
