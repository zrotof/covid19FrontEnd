import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMaACoffeeComponent } from './buy-ma-acoffee.component';

describe('BuyMaACoffeeComponent', () => {
  let component: BuyMaACoffeeComponent;
  let fixture: ComponentFixture<BuyMaACoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyMaACoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMaACoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
