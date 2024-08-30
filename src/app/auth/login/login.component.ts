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

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/todos']); // Redirect to home or dashboard

      // this.authService.login(this.loginForm.value).subscribe(
      //   () => {
      //     this.router.navigate(['/']); // Redirect to home or dashboard
      //   },
      //   error => {
      //     console.error('Login error', error);
      //   }
      // );
    }
  }
}
