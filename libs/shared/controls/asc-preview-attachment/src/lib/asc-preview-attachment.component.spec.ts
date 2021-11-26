import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscPreviewAttachmentComponent } from './asc-preview-attachment.component';

describe('AscPreviewAttachmentComponent', () => {
  let component: AscPreviewAttachmentComponent;
  let fixture: ComponentFixture<AscPreviewAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscPreviewAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscPreviewAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
