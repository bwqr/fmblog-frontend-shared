import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

// TODO: Add Angular decorator.
@Component({
  selector: 'app-main-component',
  template: ''
})
export abstract class MainComponent implements OnDestroy {

  subs = new Subscription();

  isProcessing = false;

  abstract get isPageReady(): boolean;

  get isInProcessingState(): boolean {
    return this.isProcessing;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  enterProcessingState(): void {
    this.isProcessing = true;
  }

  leaveProcessingState(): void {
    this.isProcessing = false;
  }
}
