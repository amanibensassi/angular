import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationUserDetailComponent } from './publication-user-detail.component';

describe('PublicationUserDetailComponent', () => {
  let component: PublicationUserDetailComponent;
  let fixture: ComponentFixture<PublicationUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
