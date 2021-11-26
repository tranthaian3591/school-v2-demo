import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscIconComponent } from './asc-icon.component';

describe('AscIconComponent', () => {
  let component: AscIconComponent;
  let fixture: ComponentFixture<AscIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
