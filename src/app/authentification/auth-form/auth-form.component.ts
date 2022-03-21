import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { TrainerFill } from 'src/app/models/trainer-fill';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  loginForm: boolean = false;
  createAccount: boolean = false;
  textButton: string = '';
  trainerFill!: TrainerFill;
  trainerConnected!: Object;
  email!: string;
  password!: string;
  constructor(private authService: AuthService) {}
  pushedButton(choice: number) {
    if (choice == 0) {
      //Create a trainer
      this.textButton = 'Create a trainer';
      this.createAccount = true;
    } else {
      this.textButton = 'Login my trainer';
      this.loginForm = true;
    }
  }
  authentification() {
    this.trainerFill = {
      email: this.email,
      password: this.password,
    };
    if (this.loginForm) {
      this.authService
        .Login(this.trainerFill)
        .subscribe((myResult) => (this.trainerConnected = myResult));
    } else if (this.email) {
      this.authService
        .CreateTrainer(this.trainerFill)
        .subscribe((myResult) => (this.trainerConnected = myResult));
    }
  }
  ngOnInit(): void {}
}
