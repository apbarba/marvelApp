import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroments'; 
import { Observable, map } from 'rxjs';
import { Character, CharacterDataWrapper } from '../models/characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersServiceService {
  constructor(private http: HttpClient) {}

  getCharacters(limit: number = 20, offset: number = 0): Observable<Character[]> {
    const authParams = environment.getAuthParams();
    const url = `${environment.marvelUrl}characters?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}&limit=${limit}&offset=${offset}`;

    console.log('Auth Params:', authParams);
    console.log('Request URL:', url);

    return this.http.get<CharacterDataWrapper>(url)
      .pipe(
        map(response => {
          console.log('API Response:', response);
          return response.data.results;
        })
      );
  }

  getCharacterDetails(id: number): Observable<Character> {
    const authParams = environment.getAuthParams();
    const url = `${environment.marvelUrl}characters/${id}?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`;

    return this.http.get<CharacterDataWrapper>(url)
      .pipe(
        map(response => response.data.results[0])
    );
  }
}
