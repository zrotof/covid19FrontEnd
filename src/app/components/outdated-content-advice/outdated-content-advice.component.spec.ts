import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdatedContentAdviceComponent } from './outdated-content-advice.component';

describe('OutdatedContentAdviceComponent', () => {
  let component: OutdatedContentAdviceComponent;
  let fixture: ComponentFixture<OutdatedContentAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdatedContentAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdatedContentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
