import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserLazyComponent } from './select-user-lazy.component';

describe('SelectUserLazyComponent', () => {
  let component: SelectUserLazyComponent;
  let fixture: ComponentFixture<SelectUserLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUserLazyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
