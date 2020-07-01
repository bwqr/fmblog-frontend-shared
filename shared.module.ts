import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './material.module';

import {ImageSelectComponent} from './dialogs/images/image-select/image-select.component';

import {UrlPipe} from './pipes/url.pipe';
import {EnvironmentUrlPipe} from './pipes/environment-url.pipe';
import {PaginationComponent} from './components/pagination/pagination.component';
import {ImageableAddComponent} from './components/imageable/imageable-add/imageable-add.component';
import {ImageableComponent} from './components/imageable/imageable/imageable.component';
import {SectionsComponent} from './components/formable/sections/sections.component';
import {SectionComponent} from './components/formable/section/section.component';
import {FieldComponent} from './components/formable/field/field.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [
    ImageSelectComponent,
    PaginationComponent,
    ImageableAddComponent,
    ImageableComponent,
    UrlPipe,
    EnvironmentUrlPipe,
    SectionsComponent,
    SectionComponent,
    FieldComponent,
    CustomDatePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UrlPipe,
    NgxSkeletonLoaderModule,
    EnvironmentUrlPipe,
    RouterModule,
    PaginationComponent,
    ImageableAddComponent,
    ImageableComponent,
    SectionsComponent,
    SectionComponent,
    FieldComponent,
    CustomDatePipe,
  ],
  entryComponents: [
    ImageSelectComponent,
    SectionComponent,
    FieldComponent
  ]
})
export class SharedModule {
}
