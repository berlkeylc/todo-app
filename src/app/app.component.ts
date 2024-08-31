import { Component } from '@angular/core';
import * as functions from 'firebase-functions';
import cors from 'cors';
const corsHandler = cors({ origin: "http://localhost:4200/" });
// exports.yourFunction = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, () => {
//     res.status(200).send("Hello from Firebase!");
//   });
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-app';
}
