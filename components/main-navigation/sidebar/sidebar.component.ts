import { Component, Input, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() menus;
  @Input() user;

  @Output() mode = new EventEmitter();

  constructor(private media: MediaMatcher) {
    setTimeout(
      () => this.mode.emit(this.media.matchMedia('(max-width: 1024px)').matches ? 'over' : 'side'),
      0
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
