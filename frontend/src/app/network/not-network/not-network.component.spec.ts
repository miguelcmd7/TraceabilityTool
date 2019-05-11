import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotNetworkComponent } from './not-network.component';

describe('NotNetworkComponent', () => {
  let component: NotNetworkComponent;
  let fixture: ComponentFixture<NotNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
