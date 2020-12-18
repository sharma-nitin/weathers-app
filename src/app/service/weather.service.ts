import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  appId = '3d8b309701a13f65b660fa2c64cdc517';
  baseUrl = 'http://api.openweathermap.org/data/2.5/';
  units = 'metric'
  constructor(private http: HttpClient) { }
  /**
   * Gets weatheritemsby city
   * @param cityName
   * @returns weatheritemsby city
   */
  getWeatheritemsbyCity(cityName: string): Observable<any> {
    return this.http.get(
      this.baseUrl +
      'weather?q=' + cityName +
      '&appid=' + this.appId +
      '&units=' + this.units
    )
  }
  /**
   * Gets weather forecast
   * @param cityName
   * @returns weather forecast
   */
  getWeatherForecast(cityName: string): Observable<any> {
    return this.http.get(
      this.baseUrl +
      'forecast?q=' + cityName +
      '&appid=' + this.appId +
      '&units=' + this.units
    )
  }

}
