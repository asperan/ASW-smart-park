import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisticsDetailComponent } from './satistics-detail.component';

describe('SatisticsDetailComponent', () => {
  let component: SatisticsDetailComponent;
  let fixture: ComponentFixture<SatisticsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatisticsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisticsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
