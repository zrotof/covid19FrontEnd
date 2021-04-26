import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorldStatsComponent } from './world-stats.component';

describe('WorldStatsComponent', () => {
  let component: WorldStatsComponent;
  let fixture: ComponentFixture<WorldStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
