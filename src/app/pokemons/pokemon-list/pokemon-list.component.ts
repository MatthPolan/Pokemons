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
      .getSearchPokemon(search)
      .subscribe((myResult) => (this.pokemons = myResult.data));
  }
  getpokemons() {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) => (this.pokemons = myResult.data));
    this.offset += 20;
  }
  updateId(idselect: number) {
    this.select.emit(idselect);
  }
  onScroll() {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) =>
        this.pokemons?.push.apply(this.pokemons, myResult.data)
      );
    this.offset += 20;
  }
  onChange(newval: string): void {
    console.log(newval);
    if (newval == '') {
      this.offset = 0;
      this.getpokemons();
    } else {
      this.updateList(newval);
    }
  }
}
