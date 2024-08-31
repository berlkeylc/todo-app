import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  email = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  // login() {
  //   if (this.loginForm.valid) {
  //     this.router.navigate(['/todos']); // Redirect to home or dashboard

  //     this.authService.login(this.loginForm.value).subscribe(
  //       () => {
  //         this.router.navigate(['/']); // Redirect to home or dashboard
  //       },
  //       error => {
  //         console.error('Login error', error);
  //       }
  //     );
  //   }
  // }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/todos']);
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  googleLogin() {
    this.authService.googleSignIn();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
