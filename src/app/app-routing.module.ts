import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonDetalleComponent } from './components/pokemon-detalle/pokemon-detalle.component';

const routes: Routes = [
  {path:'', component: PokemonComponent},
  {path: 'pokemon/:id', component: PokemonDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
