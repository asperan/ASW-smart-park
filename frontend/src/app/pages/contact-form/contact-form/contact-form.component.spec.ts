import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs'

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ContactFormComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({template: "payment"}),
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default route is parking', () => {
    expect(component.requestType).toEqual("payment");
  });

  it('submitSupport', () => {
    expect(component.isSubmitted).toBeFalse();
    component.submitSupport();
    expect(component.isSubmitted).toBeTrue();
  });


});

describe('ContactFormComponent Bad Template', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ ContactFormComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({template: 1}),
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('default route is parking', () => {
    expect(component.requestType).toEqual("parking");
  });

});