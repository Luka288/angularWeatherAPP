import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherAPIService } from './shared/services/weather-api.service';
import { catchError, tap } from 'rxjs';
import { SearchWeatherService } from './shared/services/search-weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly searchWeather = inject(SearchWeatherService)


  search(event: Event, value: string){
    this.searchWeather.setSearchValue(value)
    event.preventDefault();
  }
  

}
