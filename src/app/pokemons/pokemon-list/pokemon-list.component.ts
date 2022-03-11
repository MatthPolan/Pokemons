import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons?: Pokemon[];
  search?: string = '';
  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  offset: number = 0;

  constructor(private pokemonServices: PokemonService) {}

  ngOnInit(): void {
    this.getpokemons();
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
  getpokemonsScrool() {
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
      this.getpokemonsScrool();
    }
  }
  onChange(newval: string): void {
    this.offset = 0;
    if (newval == '') {
      this.getpokemons();
    } else {
      this.updateList(newval);
    }
  }
}
