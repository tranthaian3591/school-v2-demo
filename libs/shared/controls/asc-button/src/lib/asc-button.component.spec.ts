import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscButtonComponent } from './asc-button.component';

describe('AscButtonComponent', () => {
  let component: AscButtonComponent;
  let fixture: ComponentFixture<AscButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
