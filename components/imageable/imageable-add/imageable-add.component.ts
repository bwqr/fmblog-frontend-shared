import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-imageable-add',
  templateUrl: './imageable-add.component.html',
  styleUrls: ['./imageable-add.component.scss']
})
export class ImageableAddComponent implements OnInit {

  images: any = [];

  // Not yet started
  progressValue = -1;

  @Output() postImages: EventEmitter<any> = new EventEmitter();

  get isPageReady(): boolean {
    return this.images && true;
  }

  @ViewChild('file', { static: false }) file: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onPostImages(f: NgForm) {
    this.progressValue = 0;

    const data = {
      images: this.images,
      onEach: () => {
        this.images.splice(0, 1);

        if (this.images.length === 0) {
          this.progressValue = -1;
        } else {
          this.progressValue += (100 - this.progressValue) / this.images.length;
        }
      }
    };

    this.postImages.emit(data);
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  showImage() {
    const input = this.file.nativeElement;

    for (let i = 0; i < input.files.length; i++) {
      this.images.push(input.files.item(i));
    }

    setTimeout(() => {
      let i = 0;
      for (const image of this.images) {
        const reader = new FileReader();

        const item = document.getElementById('image-' + i);

        item.setAttribute('src', '');

        reader.onload = function (e: any) {

          item.setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(image);

        i++;
      }
    }, 0);
  }

  drop(event: any) {
    const image = this.images[event.previousIndex];
    this.images.splice(event.previousIndex, 1);
    this.images.splice(event.currentIndex, 0, image);
  }
}
