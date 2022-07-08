import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SlidesLoginComponent } from './slides-login/slides-login.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SlidesLoginComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SlidesLoginComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
