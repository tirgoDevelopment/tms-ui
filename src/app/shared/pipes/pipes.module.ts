import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './dateFormat.pipe';
import { FileFetchPipe } from './file-fetch.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [DateFormatPipe,FileFetchPipe],
  declarations: [DateFormatPipe,FileFetchPipe],
})
export class PipesModule { }
