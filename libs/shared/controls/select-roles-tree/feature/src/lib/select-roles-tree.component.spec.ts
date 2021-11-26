import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRolesTreeComponent } from './select-roles-tree.component';

describe('SelectRolesTreeComponent', () => {
  let component: SelectRolesTreeComponent;
  let fixture: ComponentFixture<SelectRolesTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRolesTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRolesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
