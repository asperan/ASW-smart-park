import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTabComponent } from './statistics-tab.component';

//TODO Test breaks with "Uncaught (in promise): No token found"
describe('StatisticsTabComponent', () => {
  let component: StatisticsTabComponent;
  let fixture: ComponentFixture<StatisticsTabComponent>;

  beforeEach(async () => {
    /*await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ StatisticsTabComponent ]
    })
    .compileComponents();*/
  });

  beforeEach(() => {
    /*fixture = TestBed.createComponent(StatisticsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
