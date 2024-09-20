import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbavComponent } from './navbav/navbav.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [NavbavComponent],
  exports: [NavbavComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
  export class LayoutModule { }
