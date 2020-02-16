import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-imageable-add',
  templateUrl: './imageable-add.component.html',
  styleUrls: ['./imageable-add.component.scss']
})
export class ImageableAddComponent implements OnInit {

  loading = false;

  images: Array<any> = [];

  // Not yet started
  progressValue = -1;

  @Output() postImage: EventEmitter<any> = new EventEmitter();

  get isPageReady(): boolean {
    return this.images && true;
  }

  @ViewChild('file') file: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onPostImages(f: NgForm) {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const stack = [];

    for (const image of this.images) {
      stack.push(image);
    }

    this.progressValue = 0;

    const concurrency = Math.min(3, this.images.length);

    for (let i = 0; i < concurrency; i++) {
      const image = stack.shift();

      this.postImage.emit({
        image: image,
        onSuccess: () => this.onSuccess(image, stack)
      });
    }
  }

  onSuccess(image: any, stack: Array<any>) {
    const index = this.images.findIndex(_image => image.name === image.name);
    this.images.splice(index, 1);

    if (stack.length !== 0) {
      const newImage = stack.shift();

      this.postImage.emit({
        image: newImage,
        onSuccess: () => this.onSuccess(newImage, stack)
      });

      this.progressValue += (100 - this.progressValue) / stack.length;

      return false;
    }


    this.progressValue = -1;

    this.loading = false;

    return true;
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
