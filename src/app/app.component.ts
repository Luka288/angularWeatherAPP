import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherAPIService } from './shared/services/weather-api.service';
import { catchError, tap } from 'rxjs';
import { SearchWeatherService } from './shared/services/search-weather.service';
import { HeaderServiceService } from './shared/services/header-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly searchWeather = inject(SearchWeatherService)
  private readonly headerService = inject(HeaderServiceService)


  isHeaderVisible: boolean = false

  ngOnInit(): void {
    this.headerService.headerVisible$.pipe(tap(res => {
      this.isHeaderVisible = res
    })).subscribe()
  }

  search(event: Event, value: string){
    this.searchWeather.setSearchValue(value)
    event.preventDefault();
  }

}
