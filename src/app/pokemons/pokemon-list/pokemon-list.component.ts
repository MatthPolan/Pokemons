import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { TeamService } from 'src/app/team/services/team.service';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons?: Pokemon[];
  search?: string = '';

  @Input() teamPokemonList?: number[];

  @Output() teamPokemonListChange = new EventEmitter<number[]>();

  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  offset: number = 0;

  constructor(
    private pokemonServices: PokemonService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.getpokemons();
  }
  isConnected() {
    return this.teamService.isConnected();
  }
  updateList(search: string) {
    this.pokemonServices
      .getSearchPokemon(search, this.offset)
      .subscribe((myResult) => (this.pokemons = myResult.data));
  }
  updateListScrool(search: string) {
    this.pokemonServices
      .getSearchPokemon(search, this.offset)
      .subscribe((myResult) =>
        this.pokemons?.push.apply(this.pokemons, myResult.data)
      );
  }
  getpokemons() {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) => (this.pokemons = myResult.data));
  }
  getpokemonsScroll() {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) =>
        this.pokemons?.push.apply(this.pokemons, myResult.data)
      );
  }
  updateId(idselect: number) {
    this.select.emit(idselect);
  }
  onScroll() {
    this.offset += 20;
    if (this.search) {
      this.updateListScrool(this.search);
    } else {
      this.getpokemonsScroll();
    }
  }
  selectedTimes(id: number) {
    let i = 0;
    if (this.teamPokemonList == null) {
      return null;
    }
    this.teamPokemonList.forEach((item) => {
      if (item == id) i++;
    });
    if (i == 0) return null;
    return i;
  }

  onChange(newval: string): void {
    this.offset = 0;
    if (newval == '') {
      this.getpokemons();
    } else {
      this.updateList(newval);
    }
  }

  addPokemonsToMyTeam(event: Event, id: number) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.teamPokemonList) {
      const temps = Object.assign([], this.teamPokemonList);
      temps.push(id);
      this.teamService.updateMyTeam(temps).subscribe((data) => {
        this.teamPokemonList = temps;
        this.teamPokemonListChange.emit(this.teamPokemonList);
      });
    }
  }
}
