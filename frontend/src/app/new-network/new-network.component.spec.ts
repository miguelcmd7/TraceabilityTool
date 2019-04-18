import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNetworkComponent } from './new-network.component';

describe('NewNetworkComponent', () => {
  let component: NewNetworkComponent;
  let fixture: ComponentFixture<NewNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
