import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse, RefreshTokenResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environment';
import { th } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoading = true;
  private authStateSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject.next(this.hasValidToken());
    this.checkAuthStatus();
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.isBrowser() ? localStorage.getItem(this.REFRESH_TOKEN_KEY) : null;
    return this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap(response => {
        if (this.isBrowser()) {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
        }
      }),
      catchError(error => throwError(() => error))
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);
  }

  getAccessToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.ACCESS_TOKEN_KEY) : null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isLoadingAuth(): boolean {
    return this.isLoading;
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    }
    this.isAuthenticatedSubject.next(true);
  }

  private hasValidToken(): boolean {
    return !!this.getAccessToken();
  }

  register(user: { email: string; password: string; name: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(error => throwError(() => error))
    );
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

  private checkAuthStatus() {
    let token = null;
    if(this.isBrowser()) {
       token = localStorage.getItem('token');

    }
    this.authStateSubject.next(!!token);
    this.isLoading = false;
  }
}
