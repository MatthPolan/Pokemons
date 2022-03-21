import { AuthentificationModule } from './../authentification/authentification.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatListModule } from '@angular/material/list';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
  ],
  imports: [
    AuthentificationModule,
    CommonModule,
    MatListModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
  ],
  exports: [PokemonListComponent],
})
export class PokemonsModule {}
