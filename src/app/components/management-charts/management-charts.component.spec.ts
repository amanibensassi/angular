import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementChartsComponent } from './management-charts.component';

describe('ManagementChartsComponent', () => {
  let component: ManagementChartsComponent;
  let fixture: ComponentFixture<ManagementChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
