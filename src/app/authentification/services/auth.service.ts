import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/trainer';
import { TrainerFill } from 'src/app/models/trainer-fill';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';
  constructor(private http: HttpClient) {}

  Login(myTrainer: TrainerFill): Observable<Trainer> {
    return this.http.post<Trainer>(this.url + '/auth/login', myTrainer);
  }
  CreateTrainer(myTrainer: TrainerFill): Observable<Trainer> {
    return this.http.post<Trainer>(this.url + '/trainers', myTrainer);
  }
}
