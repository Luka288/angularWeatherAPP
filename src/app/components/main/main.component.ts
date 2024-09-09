import { Component, inject } from '@angular/core';
import { tap, catchError } from 'rxjs';
import { WeatherAPIService } from '../../shared/services/weather-api.service';
import { hourlyRate, WeatherResponse } from '../../shared/interfaces/weatherInterface';
import { CommonModule, formatDate } from '@angular/common';
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService)

  displayWeather: WeatherResponse | null = null;
  foreCast: WeatherResponse[] = [];
  hourly: hourlyRate[] | null = null
  dateFormating: number | null = null;
  day: hourlyRate | null = null;


  readonly conditions: { [key: string]: string } = {
    'clear-day': 'assets/clear-day.png',
    'clear-night': 'assets/clear-night.png',
    'cloudy': 'assets/cloudy.png',
    'fog': 'assets/fog.png',
    'hail': 'assets/hail.png',
    'partly-cloudy-day': 'assets/partly-cloudy-day.png',
    'partly-cloudy-night': 'assets/partly-cloudy-night.png',
    'rain-snow-showers-day': 'assets/rain-snow-showers-day.png',
    'rain-snow-showers-night': 'assets/rain-snow-showers-night.png',
    'rain': 'assets/rain.png',
    'showers-day': 'assets/showers-day.png',
    'showers-night': 'assets/showers-night.png',
    'sleet': 'assets/sleet.png',
    'snow-showers-day': 'assets/snow-showers-day.png',
    'snow-showers-night': 'assets/snow-showers-night.png',
    'snow': 'assets/snow.png',
    'thunder-rain': 'assets/thunder-rain.png',
    'thunder-showers-day': 'assets/thunder-showers-day.png',
    'thunder-showers-night': 'assets/thunder-showers-night.png',
    'thunder': 'assets/thunder.png',
    'wind': 'assets/wind.png'
  }

  isCurrentConditionInHourly: boolean = false

  ngOnInit(): void {
    this.loadWeather('tbilisi')
  }

  loadWeather(location: string){
    this.weatherAPI.getWeather(location).pipe(tap(res => {
      this.displayWeather = res
      this.hourly = res.days[0].hours
      console.log(this.hourly)
      console.log(res)
    })
      ).subscribe()
  }


  getWeatherIcon(condition: string | undefined): string {
    return this.conditions[condition || 'Unknown'] || '';
  }

}
