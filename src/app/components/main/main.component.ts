import { Component, inject } from '@angular/core';
import { tap, catchError, of, BehaviorSubject } from 'rxjs';
import { WeatherAPIService } from '../../shared/services/weather-api.service';
import { hourlyRate, WeatherResponse } from '../../shared/interfaces/weatherInterface';
import { CommonModule, formatDate } from '@angular/common';
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";
import { SearchWeatherService } from '../../shared/services/search-weather.service';
import { RouterPreloader } from '@angular/router';
import { geoLocation } from '../../shared/interfaces/geolocation';
import { sweetAlertsService } from '../../shared/services/sweet-alerts.service';
import { HeaderServiceService } from '../../shared/services/header-service.service';
import { NgModule } from "@angular/core";
import { NgxCubeLoaderComponent } from "ngx-cube-loader";
import { RoundTempPipe } from "../../shared/pipes/round-temp.pipe";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, NgxCubeLoaderComponent, RoundTempPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export default class MainComponent {
  private readonly weatherAPI = inject(WeatherAPIService)
  private readonly searchWeather = inject(SearchWeatherService)
  private readonly alerts = inject(sweetAlertsService)
  private readonly headerBoolean = inject(HeaderServiceService)



  // all the display properties
  displayWeather: WeatherResponse | null = null;
  foreCast: WeatherResponse[] = [];
  hourly: hourlyRate[] | null = null
  dateFormating: number | null = null;
  day: hourlyRate | null = null;
  location: geoLocation | null = null;
  infoFromCoord: WeatherResponse | null = null;

  // booleans
  accessToLocation: boolean = false
  searchLocation: boolean = false
  searchBar: boolean = false
  loading: boolean = true


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



  ngOnInit(): void {
    const memory = localStorage.getItem('searchMemory')
    if(memory){
      this.loadWeather(memory)
    }
    this.getSearch()
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos: geoLocation) => {
        this.accessToLocation = true
        this.location = pos
        console.log(pos)
        this.weatherAPI.coordinatesWeather(pos.coords.latitude, pos.coords.longitude).pipe(tap(res => {
          this.infoFromCoord = res
        })).subscribe()
      },
      (error: GeolocationPositionError) => {
        if(error.PERMISSION_DENIED){  
          this.accessToLocation = false
          this.alerts.toast('loaction denied', 'error', 'red')
        }
      }
    )
    }
  }

  loadWeather(location: string){
    if(location === ''){
      this.searchLocation = false;
      this.searchBar = true
      this.headerBoolean.isHeaderAvailable(false)
      return
    }
    this.weatherAPI.getWeather(location).pipe(tap(res => {
      this.searchBar = false
      this.searchLocation = true
      this.displayWeather = res
      this.hourly = res.days[0].hours
      console.log(this.hourly)
      console.log(res)
      this.headerBoolean.isHeaderAvailable(true)
      localStorage.setItem('searchMemory', location)
    })
    ).subscribe()
  }


  getWeatherIcon(condition: string | undefined): string {
    return this.conditions[condition || 'Unknown'] || '';
  }

  getSearch(){
    this.searchWeather.searchValue$.subscribe(value => {
      if (value) {
        console.log(value);
        this.loadWeather(value);
        localStorage.setItem('searchValue', value)
      }
    });
  }

  setBg(){
    switch (this.displayWeather?.currentConditions?.icon) {
      case 'clear-day':
        return 'assets/videos/clear-day.mp4';

      case 'clear-night':
        return 'assets/videos/clear-night.mp4';

      case 'cloudy':
        return 'assets/videos/cloudy.mp4';

      case 'fog':
        return 'assets/videos/fog.mp4';

      case 'hail':
        return 'assets/videos/hail-weather.mp4';

      case 'partly-cloudy-day':
        return 'assets/videos/partly-cloudy-day.mp4';

      case 'partly-cloudy-night':
        return 'assets/videos/partly-cloudy-night.mp4';

      case 'rain-snow-showers-day':
        return 'assets/videos/rain-snow-showers-day.mp4'

      case 'rain-snow-showers-night':
        return 'assets/videos/rain-snow-showers-night.mp4'

      case 'rain-snow':
        return 'assets/videos/rainSnow.mp4'

      case 'rain':
        return 'assets/videos/rain.mp4'

      case 'showers-day':
        return 'assets/videos/showers-day.mp4'

      case 'showers-night':
        return ''

      case 'snow':
        return ''

      case 'thunder-rain':
        return ''

      case 'thunder-showers-day':
        return ''

      case 'thunder-showers-night':
        return ''

      case 'thunder':
        return ''

      case 'wind':
        return ''

      default:
        return 'default';
    }
  }
}
