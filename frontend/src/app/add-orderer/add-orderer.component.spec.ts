import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdererComponent } from './add-orderer.component';

describe('AddOrdererComponent', () => {
  let component: AddOrdererComponent;
  let fixture: ComponentFixture<AddOrdererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
