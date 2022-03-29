import { Pokemon } from 'src/app/models/pokemon';

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  @Input() idPok?: number[] = [];
  @Output() idPokChange = new EventEmitter<number[]>();

  pokemonTeam?: Pokemon[];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getMyTeam();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['idPok'].currentValue)
      this.getPokemonTeambyId(changes['idPok'].currentValue);
  }
  PostData() {
    this.idPokChange.emit(this.idPok);
  }
  getMyTeam() {
    this.teamService
      .getMyTeam()
      .subscribe((ids) => this.getPokemonTeambyId(ids));
  }
  getPokemonTeambyId(ids: number[]) {
    this.idPok = ids;
    this.PostData();
    if (ids.length == 0) {
      this.pokemonTeam = [];
    } else {
      this.teamService
        .getPokemonsByList(ids)
        .subscribe((myResult) => (this.pokemonTeam = myResult));
    }
  }
  removePokemon(event: Event, idRemove: number) {
    event.preventDefault();
    // EDIT: Looks like you also have to include Event#stopImmediatePropogation as well
    event.stopImmediatePropagation();
    let index = this.idPok?.indexOf(idRemove);
    const temps = Object.assign([], this.idPok);

    if (index! > -1) {
      temps.splice(index!, 1);

      this.teamService.updateMyTeam(temps).subscribe((data) => {
        this.getPokemonTeambyId(temps);
      });
    }
  }
}
