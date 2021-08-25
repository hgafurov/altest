import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHelloComponent } from './guest-hello.component';

describe('GuestHelloComponent', () => {
  let component: GuestHelloComponent;
  let fixture: ComponentFixture<GuestHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestHelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
