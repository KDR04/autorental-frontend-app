import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePageComponent } from './bike-page.component';

describe('BikePageComponent', () => {
  let component: BikePageComponent;
  let fixture: ComponentFixture<BikePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
