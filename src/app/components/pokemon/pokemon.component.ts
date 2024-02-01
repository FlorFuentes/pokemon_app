import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/api-pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  //Array de objetos
  pokemons: Pokemon[] = [];

  //Inyecto dos servicios
  constructor(private router: Router, private pokemonService: ApiPokemonService) { }

  //Metodo para luego llamar a getPokemons y asi obtener la lista de pokemones
  ngOnInit(): void {
    this.getPokemons();
  }

  //En este metodo uso el servicio para obtener la lista de pokemones. Asigno los datos devueltos a la propiedad pokemons
  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemons = data;

      this.pokemons.forEach(pokemon => {
        console.log('URL de la imagen:', pokemon.imgUrl);
      });
    })
  }

  //Metodo que uso para redirigir la vista detallada de un pokemon especifico usando Router
  viewPokemonDetails(id: number) {
    console.log("ID:", id);
    this.router.navigate(['/pokemon/', id]);

  }
}
