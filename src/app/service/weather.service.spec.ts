import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
describe('WeatherService', () => {
    let component: WeatherService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [WeatherService]
        });
        component = TestBed.get(WeatherService);
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('makes call to getWeatheritemsbyCity ', () => {
        spyOn(component, 'getWeatheritemsbyCity').and.callThrough();
        component.getWeatheritemsbyCity('London');
        expect(component.getWeatheritemsbyCity).toHaveBeenCalled();
    });
    it('makes call to getWeatherForecast ', () => {
        spyOn(component, 'getWeatherForecast').and.callThrough();
        component.getWeatherForecast('London');
        expect(component.getWeatherForecast).toHaveBeenCalled();
    });
})
