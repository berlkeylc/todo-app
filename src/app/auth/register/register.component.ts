import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  email = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // get email(): AbstractControl {
  //   return this.registerForm.get('email') as AbstractControl;
  // }

  // get password(): AbstractControl {
  //   return this.registerForm.get('password') as AbstractControl;
  // }

  // get confirmPassword(): AbstractControl {
  //   return this.registerForm.get('confirmPassword') as AbstractControl;
  // }

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = null;

    const { email, password } = this.registerForm.value;
    
    try {
      await this.authService.register(email, password);
      this.router.navigate(['/todos']);
    } catch (error) {
      this.error = 'Registration failed. Please try again.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  googleRegister() {
    this.authService.googleSignIn();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
