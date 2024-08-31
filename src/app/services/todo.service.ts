// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { switchMap,map, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { CustomToastrService } from './custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private spinnerService: SpinnerService, // Inject SpinnerService
    private toastr: CustomToastrService // Inject CustomToastrService
  ) { }

  // Get todos for the current user including IDs
  getTodos(): Observable<any[]> {
    this.spinnerService.show(); // Show spinner
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('todos', ref => ref.where('userId', '==', user.uid))
            .snapshotChanges()
            .pipe(
              map(actions => actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              })),
              tap(() => this.spinnerService.hide()) // Hide spinner on completion
            );
        } else {
          this.spinnerService.hide(); // Hide spinner if no user
          return [];
        }
      })
    );
  }

  // Add a new todo for the current user
  addTodo(text: string): Promise<void> {
    this.spinnerService.show();
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const id = this.firestore.createId();
          return this.firestore.collection('todos').doc(id).set({
            text,
            completed: false,
            userId: user.uid
          }).then(() => {
            this.spinnerService.hide();
            this.toastr.success('Todo added successfully'); // Show success notification
          }).catch(error => {
            this.spinnerService.hide();
            this.toastr.error('Failed to add todo', 'Error'); // Show error notification
            console.error('Error adding todo:', error);
          });
        } else {
          this.spinnerService.hide();
          this.toastr.error('User not authenticated', 'Error'); // Show error notification
          return Promise.reject('User not authenticated');
        }
      })
    ).toPromise();
  }

  // Delete a todo by ID
  deleteTodo(id: string): Promise<void> {
    this.spinnerService.show();
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('todos').doc(id).delete()
            .then(() => {
              this.spinnerService.hide();
              this.toastr.success('Todo deleted successfully'); // Show success notification
            }).catch(error => {
              this.spinnerService.hide();
              this.toastr.error('Failed to delete todo', 'Error'); // Show error notification
              console.error('Error deleting todo:', error);
            });
        } else {
          this.spinnerService.hide();
          this.toastr.error('User not authenticated', 'Error'); // Show error notification
          return Promise.reject('User not authenticated');
        }
      })
    ).toPromise();
  }
}
