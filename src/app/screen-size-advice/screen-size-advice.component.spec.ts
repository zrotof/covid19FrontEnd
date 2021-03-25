import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeAdviceComponent } from './screen-size-advice.component';

describe('ScreenSizeAdviceComponent', () => {
  let component: ScreenSizeAdviceComponent;
  let fixture: ComponentFixture<ScreenSizeAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenSizeAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSizeAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
