import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClarityModule} from '@clr/angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [CommonModule, ClarityModule]
})
export class SharedModule {
}
