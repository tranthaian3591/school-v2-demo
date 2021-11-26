import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscUploadComponent } from './asc-upload.component';

describe('AscUploadComponent', () => {
  let component: AscUploadComponent;
  let fixture: ComponentFixture<AscUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
