import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementHistoryUserComponent } from './management-history-user.component';

describe('ManagementHistoryUserComponent', () => {
  let component: ManagementHistoryUserComponent;
  let fixture: ComponentFixture<ManagementHistoryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementHistoryUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementHistoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
