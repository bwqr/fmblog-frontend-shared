import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class MainComponent implements OnDestroy {

  subs = new Subscription();

  isProcessing = false;

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
