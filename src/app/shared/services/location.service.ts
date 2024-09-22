import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { currKey, currLocation } from '../consts/consts';
import { currLocationInter } from '../interfaces/currInterface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly http = inject(HttpClient)

  getCurr(){
    return this.http.get<currLocationInter>(`${currLocation}${currKey}`)
  }

}
