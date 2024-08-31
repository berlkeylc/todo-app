import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CustomToastrService } from '../../../services/custom-toastr.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastr: CustomToastrService) { }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.toastr.success('You have been logged out.');
      this.router.navigate(['/login']); // Navigate to login or home page after logout
    }).catch(error => {
      this.toastr.error('Logout failed', 'Error');
      console.error('Error during logout:', error);
    });
  }
}
