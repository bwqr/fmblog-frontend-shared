import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageableAddComponent } from './imageable-add.component';

describe('ImageableAddComponent', () => {
  let component: ImageableAddComponent;
  let fixture: ComponentFixture<ImageableAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageableAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
