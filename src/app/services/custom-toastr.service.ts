import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  success(message: string, title?: string) {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in-out',
      // Add any additional customization here
    });
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in-out',
      // Add any additional customization here
    });
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in-out',
      // Add any additional customization here
    });
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      easing: 'ease-in-out',
      // Add any additional customization here
    });
  }
}
