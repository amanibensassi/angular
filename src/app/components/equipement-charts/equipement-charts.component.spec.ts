import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementChartsComponent } from './equipement-charts.component';

describe('EquipementChartsComponent', () => {
  let component: EquipementChartsComponent;
  let fixture: ComponentFixture<EquipementChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
