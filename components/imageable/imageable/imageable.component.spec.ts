import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageableComponent } from './imageable.component';

describe('ImageableComponent', () => {
  let component: ImageableComponent;
  let fixture: ComponentFixture<ImageableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
