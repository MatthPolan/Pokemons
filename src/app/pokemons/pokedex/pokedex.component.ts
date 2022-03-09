import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  idPokemonParent?: number;
  constructor() {}

  ngOnInit(): void {}
  updatePokemon(idSelect: number) {
    this.idPokemonParent = idSelect;
  }
}
