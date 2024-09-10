import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { weatherKey } from '../consts/consts';
import { WeatherResponse } from '../interfaces/weatherInterface';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {
  private readonly http = inject(HttpClient);
  

  protected readonly key = weatherKey

  getWeather(location: string){
    return this.http.get<WeatherResponse>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${this.key}&contentType=json`)
  }

  coordinatesWeather(latitude: number, longitude: number){
    return this.http.get<WeatherResponse>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}, ${longitude}?unitGroup=metric&key=${this.key}&contentType=json`)
  }

}
