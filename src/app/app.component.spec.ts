import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AppComponent } from "./app.component";
import { WeatherService } from './service/weather.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const weatherServiceStub = {
      getWeatherForecast: () => ({ subscribe: f => f({}) })

    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('makes call to ngOnInit ', inject([WeatherService],(weatherService) => {
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.whenStable().then(() => {
      component.ngOnInit();
      weatherService.getWeatherForecast('London').subscribe(result => expect(result).toBeDefined());
      expect(component.ngOnInit()).toHaveBeenCalled();
    });
  }));
  it('makes call to findDay ',() => {
    spyOn(component, 'findDay').and.callThrough();
    fixture.whenStable().then(() => {
      component.findDay(2);
      expect(component.findDay).toHaveBeenCalled();
    });
  });
})
