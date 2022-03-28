import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PagedData } from 'src/app/models/paged-data';
import { Pokemon } from 'src/app/models/pokemon';
import { Trainer } from 'src/app/models/trainer';
import { HttpHeaders } from '@angular/common/http';
import { PokemonService } from 'src/app/pokemons/services/pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  url: string =
    'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers';
  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {}
  isConnected() {
    if (localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.clear();
  }
  getAccesToken() {
    return localStorage.getItem('access_token');
  }
  setToken(myResult: Trainer) {
    localStorage.setItem('access_token', myResult.access_token),
      localStorage.setItem('expires_in', myResult.expires_in),
      localStorage.setItem('refresh_token', myResult.refresh_token);
  }

  getMyTeam(): Observable<number[]> {
    const accestoken = this.getAccesToken();
    if (accestoken == null) {
      throw new Error();
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accestoken}`
    );

    return this.http.get<number[]>(this.url + '/me/team', {
      headers: headers,
    });
  }

  getPokemonsByList(ids: number[]) {
    let obsevablearray: any[] = [];
    ids.forEach((id) =>
      obsevablearray.push(this.pokemonService.getPokemonById(id))
    );
    return forkJoin(obsevablearray);
  }

  updateMyTeam(data: number[]): Observable<number[]> {
    const accestoken = this.getAccesToken();
    if (accestoken == null) {
      throw new Error();
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accestoken}`
    );
    return this.http.put<number[]>(this.url + '/me/team', data, {
      headers: headers,
    });
  }
}