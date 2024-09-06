import { Component, inject } from '@angular/core';
import { tap, catchError } from 'rxjs';
import { WeatherAPIService } from '../../shared/services/weather-api.service';
import { WeatherResponse } from '../../shared/interfaces/weatherInterface';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService)

  displayWeather: WeatherResponse | null = null;


  ngOnInit(): void {
    this.loadWeather('tbilisi')
  }

  loadWeather(location: string){
    this.weatherAPI.getWeather(location).pipe(tap(res => {
      this.displayWeather = res
      console.log(res)
    })
      ).subscribe()
  }
}
