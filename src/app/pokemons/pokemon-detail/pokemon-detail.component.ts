import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from 'src/app/team/services/team.service';
import { AuthFormComponent } from 'src/app/authentification/auth-form/auth-form.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  @Input() idPokemon?: number;
  pokemonDetail!: Pokemon;
  audio?: HTMLAudioElement;
  constructor(
    private pokemonService: PokemonService,
    private location: Location,
    public dialog: MatDialog,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.idPokemon) {
      this.getHeroDetail(this.idPokemon);
      this.loadsound(this.idPokemon);
    }
    this.playsound();
  }
  getHeroDetail(id: number) {
    this.pokemonService
      .getPokemonById(id)
      .subscribe((myResult) => (this.pokemonDetail = myResult));
  }
  goBack() {
    this.location.back();
  }
  loadsound(id: number) {
    this.audio = new Audio();
    this.audio.src = '/assets/audio/' + id + '.mp3';
    this.audio.load();
  }
  playsound() {
    this.audio?.play();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AuthFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logout() {
    this.teamService.logout();
  }
  isConnected() {
    return this.teamService.isConnected();
  }
}
