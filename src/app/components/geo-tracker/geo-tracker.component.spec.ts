import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoTrackerComponent } from './geo-tracker.component';

describe('GeoTrackerComponent', () => {
  let component: GeoTrackerComponent;
  let fixture: ComponentFixture<GeoTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
