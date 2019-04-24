import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { ImageSelectComponent } from './dialogs/images/image-select/image-select.component';

import { UrlPipe } from './pipes/url.pipe';
import { EnvironmentUrlPipe } from './pipes/environment-url.pipe';

@NgModule({
  declarations: [
    ImageSelectComponent,
    UrlPipe,
    EnvironmentUrlPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    UrlPipe,
    EnvironmentUrlPipe,
    RouterModule
  ],
  entryComponents: [
    ImageSelectComponent
  ]
})
export class SharedModule { }
