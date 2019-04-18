import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdererDetailComponent } from './orderer-detail.component';

describe('OrdererDetailComponent', () => {
  let component: OrdererDetailComponent;
  let fixture: ComponentFixture<OrdererDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdererDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdererDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
