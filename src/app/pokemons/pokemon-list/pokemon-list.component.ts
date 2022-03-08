import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons?: Pokemon[];
  offset: number = 0;
  constructor(private pokemonServices: PokemonService) {}

  ngOnInit(): void {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) => (this.pokemons = myResult.data));
    this.offset += 20;
  }
  onScroll() {
    this.pokemonServices
      .getPokemons(this.offset)
      .subscribe((myResult) =>
        this.pokemons?.push.apply(this.pokemons, myResult.data)
      );
    this.offset += 20;
  }
}
