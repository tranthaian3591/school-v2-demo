import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListUserComponent } from './modal-list-user.component';

describe('ModalListUserComponent', () => {
  let component: ModalListUserComponent;
  let fixture: ComponentFixture<ModalListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
