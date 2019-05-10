import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrdererComponent } from './create-orderer.component';

describe('CreateOrdererComponent', () => {
  let component: CreateOrdererComponent;
  let fixture: ComponentFixture<CreateOrdererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrdererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrdererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
