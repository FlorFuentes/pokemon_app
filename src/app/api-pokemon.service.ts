import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from './model/pokemon';


@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  //variable con la url de la api
  private apiURL = 'https://pokeapi.co/api/v2/pokemon';


//Inyectamos el servicio HttpClient para realizar la peticion HTTP
  constructor(private http: HttpClient) { }

  //Realizamos la peticion Get a la api.
  getPokemons(): Observable<any[]> {
    return this.http.get<any>(`${this.apiURL}?limit=10`).pipe(
      map((data) => { //En el map extraemos el Id de la url y construimos la url de la imagen usando el id
        return data.results.map((pokemon: any) => {
          const id = this.extractPokemonId(pokemon.url); //Extrae el ID de la url
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return { id, name: pokemon.name, imgUrl};
        })
      })
    );
  }

  //Usamos el map para transformar los datos que recibimos en un objeto pokemon con los detalles que necesito
  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiURL}/${id}`).pipe(
      map((data: any) => {
        console.log(data.sprites);
        return {
          id: data.id,
          name: data.name,
          weight: data.weight,
          height: data.height,
          imgUrl: data.sprites.front_default, // Utiliza la URL de la imagen desde sprites.front_default
          number: id 
        };

      })
    );
  }

  private extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }
}
