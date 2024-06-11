import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroments'; 
import { Observable, map } from 'rxjs';
import { url } from 'inspector';
import { Series, SeriesDataWrapper } from '../models/tvShow.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) { }

    getSeries(limit: number = 20, offset: number = 0): Observable<Series[]>{
      const authParams = environment.getAuthParams();
      const url = `${environment.marvelUrl}series?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}&limit=${limit}&offset=${offset}`;

      console.log('Auth Params:', authParams);
      console.log('Request URL:', url);

      return this.http.get<SeriesDataWrapper>(url)
      .pipe(
        map(response => {
          console.log('API Response:', response);

          return response.data.results;
        })
      )
    
   
    //https://gateway.marvel.com:443/v1/public/series?apikey=159103821392056e08f70aefbc6c0b2c
  }
}
