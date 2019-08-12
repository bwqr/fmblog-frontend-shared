import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class MainComponent implements OnInit, OnDestroy {

    subs = new Subscription();

    abstract ngOnInit(): void;

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
