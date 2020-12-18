import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherForecastData: any;
  errorMessage = '';
  location: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  loader = false;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Highest Temperature' },
    { data: [], label: 'Lowest Temperature' }
  ];
  sunRise: any;
  sunSet: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.onSubmit('Madrid');
  }

  cityDetails(id: string) {
    this.onSubmit(id);
  }
  /**
   * Determines whether submit on
   * @param cityName
   */
  onSubmit(cityName: string) {
    cityName = cityName.trim();
    if (cityName) {
      this.barChartData = [{ data: [], label: 'Highest Temperature' },
      { data: [], label: 'Lowest Temperature' }];
      this.loader = true;
      this.weatherService.getWeatherForecast(cityName).subscribe(data => {
        this.weatherForecastData = data;
        this.sunRise = data.city.sunrise;
        this.sunSet = data.city.sunset;
        this.day1 = this.findDay((new Date((this.weatherForecastData.list[0].dt) * 1000).getDay() + 1) === 7 ? 0 : new Date((this.weatherForecastData.list[0].dt) * 1000).getDay() +1);
        this.day2 = this.findDay((new Date((this.weatherForecastData.list[8].dt) * 1000).getDay() + 1) === 7 ? 0 : new Date((this.weatherForecastData.list[8].dt) * 1000).getDay() +1);
        this.day3 = this.findDay((new Date((this.weatherForecastData.list[16].dt) * 1000).getDay() + 1) === 7 ? 0 : new Date((this.weatherForecastData.list[16].dt) * 1000).getDay() +1);
        this.day4 = this.findDay((new Date((this.weatherForecastData.list[24].dt) * 1000).getDay() + 1) === 7 ? 0 : new Date((this.weatherForecastData.list[24].dt) * 1000).getDay() +1);
        this.day5 = this.findDay((new Date((this.weatherForecastData.list[32].dt) * 1000).getDay() + 1) === 7 ? 0 : new Date((this.weatherForecastData.list[32].dt) * 1000).getDay() +1);
        data = {
          "Day1": {
            "Highest Temperature": this.weatherForecastData.list[0].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[0].main.temp_min
          },
          "Day2": {
            "Highest Temperature": this.weatherForecastData.list[8].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[8].main.temp_min
          },
          "Day3": {
            "Highest Temperature": this.weatherForecastData.list[16].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[16].main.temp_min
          },
          "Day4": {
            "Highest Temperature": this.weatherForecastData.list[24].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[24].main.temp_min
          },
          "Day5": {
            "Highest Temperature": this.weatherForecastData.list[32].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[32].main.temp_min
          }
        };
        this.barChartLabels = Object.keys(data);
        this.barChartLabels.forEach(label => {
          this.barChartData[0].data.push(data[label]['Highest Temperature']);
          this.barChartData[1].data.push(data[label]['Lowest Temperature']);
        });
      }, error => {
        this.loader = false;
        this.location = '';
        this.errorMessage = `${cityName} doesn't  seems to be a valid city. Please try again.`;
      }
        , () => {
          this.location = '';
          this.loader = false;
          this.errorMessage = '';
        });
    }
  }
  /**
   * Finds day
   * @param weekday
   * @returns
   */
  findDay(weekday: number) {
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayName[weekday];
  }


}
