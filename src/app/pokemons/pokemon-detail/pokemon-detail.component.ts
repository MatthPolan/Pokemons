import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail!: Pokemon;
  audio?: HTMLAudioElement;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHeroDetail();
    this.loadsound();
    this.playsound();
  }
  getHeroDetail() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService
      .getPokemonById(id)
      .subscribe((myResult) => (this.pokemonDetail = myResult));
  }
  goBack() {
    this.location.back();
  }
  loadsound() {
    this.audio = new Audio();
    this.audio.src =
      '/assets/audio/' +
      Number(this.route.snapshot.paramMap.get('id')) +
      '.mp3';
    this.audio.load();
  }
  playsound() {
    this.audio?.play();
  }
}
