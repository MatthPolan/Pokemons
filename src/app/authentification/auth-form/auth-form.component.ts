import { PokemonDetailComponent } from './../../pokemons/pokemon-detail/pokemon-detail.component';
import { Component, OnInit } from '@angular/core';
import { TrainerFill } from 'src/app/models/trainer-fill';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/team/services/team.service';

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
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<PokemonDetailComponent>,
    private teamService: TeamService
  ) {}
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
        .subscribe((myResult) => this.teamService.setToken(myResult));
    } else if (this.email) {
      this.authService
        .CreateTrainer(this.trainerFill)
        .subscribe((myResult) => this.teamService.setToken(myResult));
    }
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
