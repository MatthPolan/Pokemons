import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../team/services/team.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  idPokemonParent?: number;
  teamPokList?: number[] = [];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {}
  updatePokemon(idSelect: number) {
    this.idPokemonParent = idSelect;
  }
  isConnected() {
    return this.teamService.isConnected();
  }
  teamPokemonList(team?: number[]) {
    this.teamPokList = team;
  }
}
