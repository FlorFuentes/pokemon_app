import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPokemonService } from 'src/app/api-pokemon.service';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-pokemon-detalle',
  templateUrl: './pokemon-detalle.component.html',
  styleUrls: ['./pokemon-detalle.component.css']
})
export class PokemonDetalleComponent implements OnInit {

  //Inicializo la propiedad pokemon. Va almacenar los detalles de un pokemon especifico
  pokemon: Pokemon = new Pokemon();

  //Inyecto dos servicios
  constructor(private route: ActivatedRoute, private pokemonService: ApiPokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {  //suscribe a los cambios en los parametros de la url.Cuando hay un cambio en los parametros de la url, se llama al metodo getPokemonDetails() con el id q obtengo de la url
      const id = +params['id']; // Obtener el ID del Pokémon de la URL
      this.getPokemonDetails(id);
    });
  }

  //Uso el servicio para obtener los detalles de un pokemon,usando su id. Despues los asigno a la propiedad pokemon
  getPokemonDetails(id: number) {
    this.pokemonService.getPokemonDetails(id).subscribe((data: any) => {
      this.pokemon = data;
    });
  }

}
