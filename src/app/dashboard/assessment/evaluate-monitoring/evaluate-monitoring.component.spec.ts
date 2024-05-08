import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateMonitoringComponent } from './evaluate-monitoring.component';

describe('EvaluateMonitoringComponent', () => {
  let component: EvaluateMonitoringComponent;
  let fixture: ComponentFixture<EvaluateMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateMonitoringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluateMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
