import { HttpClient } from '@angular/common/http';
import { computed, Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  AuthResult,
  LoginRequest,
  RefreshRequest,
} from '../dashboard/Models/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthServices {
  // injection of services
  private cookieService = inject(CookieService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

  }

  // variable and constants
  private API_URL = `http://localhost:5281/api`;
  private tokenKey = 'access_token';
  private refreshKey = 'refresh_token';
  private rememberKey = 'remember_me';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  login(data: LoginRequest): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.API_URL}/Auth/Login`, data).pipe(
      tap((res) => {
        this.storeTokens(res.accessToken, res.refreshToken, data.rememberMe);
        this.loggedIn$.next(true);
      })
    );
  }

  refreshToken(): Observable<AuthResult> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();
    return this.http
      .post<AuthResult>(`${this.API_URL}/Auth/refresh-token`, { accessToken, refreshToken  })
      .pipe(
        tap((res) => {
          this.storeTokens(
            res.accessToken,
            res.refreshToken,
            this.getRememberMe()
          );
        })
      );
  }

  logout() {
    this.clearTokens();
    this.loggedIn$.next(false);
    this.router.navigate(['/auth-login']);
  }

  isLoggedIn() {
    console.log("logged in value : ", this.loggedIn$.asObservable());
    return this.loggedIn$.asObservable();
  }

  private storeTokens(
    accessToken: string,
    refreshToken: string,
    remember: boolean
  ) {
    if (remember) {
      this.cookieService.set(this.tokenKey, accessToken, {
        expires: 1,
        sameSite: 'Lax',
        secure: true,
      });
      this.cookieService.set(this.refreshKey, refreshToken, {
        expires: 30,
        sameSite: 'Lax',
        secure: true,
      });
      this.cookieService.set(this.rememberKey, 'true', {
        expires: 30,
        sameSite: 'Lax',
        secure: true,
      });
    } else {
      sessionStorage.setItem(this.tokenKey, accessToken);
      sessionStorage.setItem(this.refreshKey, refreshToken);
      sessionStorage.setItem(this.rememberKey, 'false');
    }
  }

  private clearTokens() {
    this.cookieService.deleteAll();
    if(this.isBrowser) {
      sessionStorage.clear();
    }
  }

  private hasToken(){
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    let accessToken = this.cookieService.get(this.tokenKey);
    let accessToken2 = this.isBrowser ? sessionStorage.getItem(this.tokenKey) : null;
    if(accessToken.length > 0)
    {
      // console.log("passed access token is 1 : ",accessToken);
      return accessToken;
    }
    else if(accessToken2 != null && accessToken2.length > 0)
    {
      // console.log("passed access token is 2 : ",accessToken2);
      return accessToken2;
    }else {
      return "N/A";
    }
  }

  getRefreshToken(): string | null {

    let refreshToken = this.cookieService.get(this.refreshKey);
    let refreshToken2 = this.isBrowser ? sessionStorage.getItem(this.refreshKey) : null;
    if(refreshToken.length > 0)
      {
        return refreshToken;
      }
      else if(refreshToken2 != null && refreshToken2.length > 0)
      {
        return refreshToken2;
      }else {
        return "N/A";
      }

  }

  getRememberMe(): boolean {
    return this.cookieService.get(this.rememberKey) === 'true';
  }
}


