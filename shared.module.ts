import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { ImageSelectComponent } from './dialogs/images/image-select/image-select.component';

import { UrlPipe } from './pipes/url.pipe';
import { EnvironmentUrlPipe } from './pipes/environment-url.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ImageableAddComponent } from './components/imageable/imageable-add/imageable-add.component';
import { ImageableComponent } from './components/imageable/imageable/imageable.component';

@NgModule({
  declarations: [
    ImageSelectComponent,
    PaginationComponent,
    ImageableAddComponent,
    ImageableComponent,
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
    RouterModule,
    PaginationComponent,
    ImageableAddComponent,
    ImageableComponent
  ],
  entryComponents: [
    ImageSelectComponent
  ]
})
export class SharedModule { }
