import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imageable',
  templateUrl: './imageable.component.html',
  styleUrls: ['./imageable.component.scss']
})
export class ImageableComponent implements OnInit {

  save = false;

  @Input() images: any;

  @Input() imageUrl: string;

  @Input() imageKey: string;

  @Input() primaryKey: string;

  @Output() saveOrder = new EventEmitter();

  @Output() deleteImage = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSaveOrder() {
    this.saveOrder.emit(() => this.save = false);
  }

  onDeleteImage(event: any) {
    this.deleteImage.emit(event.item.data[this.primaryKey]);
  }

  drop(event: any) {
    const itemElement = event.item.element.nativeElement;

    const column = Math.floor(event.container.element.nativeElement.clientWidth / itemElement.clientWidth);
    const row = Math.ceil(this.images.length / column);

    const itemDim = { witdh: itemElement.clientWidth, height: itemElement.clientHeight };

    let xIndex = Math.floor((event.distance.x + event.item._dragRef._pickupPositionInElement.x) / itemDim.witdh);
    let yIndex = Math.floor((event.distance.y + event.item._dragRef._pickupPositionInElement.y) / itemDim.height);

    xIndex = Math.min(Math.max(xIndex, -(event.previousIndex % column)), column - 1);
    yIndex = Math.min(Math.max(yIndex, -Math.floor(event.previousIndex / column)), row - 1);

    const index = (Math.floor(event.previousIndex / column) + yIndex) * column +
      ((event.previousIndex % column) + xIndex);

    if (event.previousIndex !== index) {
      this.images.splice(event.previousIndex, 1);
      this.images.splice(index, 0, event.item.data);

      this.save = true;
    }
  }
}
