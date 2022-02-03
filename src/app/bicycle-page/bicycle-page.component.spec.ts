import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicyclePageComponent } from './bicycle-page.component';

describe('BicyclePageComponent', () => {
  let component: BicyclePageComponent;
  let fixture: ComponentFixture<BicyclePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BicyclePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BicyclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
