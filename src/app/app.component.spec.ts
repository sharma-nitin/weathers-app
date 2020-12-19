import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('makes call to ngOnInit ',() => {
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.whenStable().then(() => {
      component.ngOnInit();
      expect(component.ngOnInit()).toHaveBeenCalled();
    });
  });

})
