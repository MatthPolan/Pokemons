import { PagedData } from './../../models/paged-data';
import { Pokemon } from './../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  response?: PagedData<Pokemon>;
  url: string =
    'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';
  constructor(private http: HttpClient) {}

  getPokemons(offset: number): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(
      this.url + '?' + 'offset=' + offset + '&limit=' + 20
    );
  }
  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.url + '/' + id);
  }
  getSearchPokemon(params: string): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.url + '?search=' + params);
  }
}
