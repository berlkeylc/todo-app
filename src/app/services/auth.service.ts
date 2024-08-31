import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CustomToastrService } from './custom-toastr.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://yourapi.com/api/auth'; // Replace with your API URL
  private tokenKey = 'authToken';
  user$: Observable<firebase.User | null>;


  constructor(private http: HttpClient, private afAuth: AngularFireAuth,  private toastr: CustomToastrService, private router: Router,) {
    this.user$ = afAuth.authState;
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  // }

  // login(credentials: any): Observable<any> {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
  //     tap(response => {
  //       localStorage.setItem(this.tokenKey, response.token);
  //     })
  //   );
  // }

  // logout() {
  //   localStorage.removeItem(this.tokenKey);
  // }

  googleSignIn() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      this.router.navigate(['/todos']); // Redirect to todo list
    }).catch((error) => {
      this.toastr.error('Login failed. Please try again.');
    });
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afAuth.signOut();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
