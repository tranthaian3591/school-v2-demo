import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartmentTreeComponent } from './select-department-tree.component';

describe('SelectDepartmentTreeComponent', () => {
  let component: SelectDepartmentTreeComponent;
  let fixture: ComponentFixture<SelectDepartmentTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDepartmentTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartmentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
