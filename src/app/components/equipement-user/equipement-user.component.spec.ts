import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementUserComponent } from './equipement-user.component';

describe('EquipementUserComponent', () => {
  let component: EquipementUserComponent;
  let fixture: ComponentFixture<EquipementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
