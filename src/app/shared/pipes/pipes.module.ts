import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './dateFormat.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [DateFormatPipe],
  declarations: [DateFormatPipe],
})
export class PipesModule { }
