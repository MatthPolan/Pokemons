import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  idPok?: number[] = [];
  @Output() sendTabId: EventEmitter<number[]> = new EventEmitter<number[]>();
  pokemonTeam?: Pokemon[];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getMyTeam();
  }
  PostData() {
    this.sendTabId.emit(this.idPok);
  }
  getMyTeam() {
    this.teamService
      .getMyTeam()
      .subscribe((ids) => this.getPokemonTeambyId(ids));
  }
  getPokemonTeambyId(ids: number[]) {
    console.log('id' + ids);

    this.idPok = ids;
    this.PostData();
    console.log('idPoke' + this.idPok);

    if (this.idPok != null) {
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
