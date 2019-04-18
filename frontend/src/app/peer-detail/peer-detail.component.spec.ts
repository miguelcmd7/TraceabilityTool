import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerDetailComponent } from './peer-detail.component';

describe('PeerDetailComponent', () => {
  let component: PeerDetailComponent;
  let fixture: ComponentFixture<PeerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
