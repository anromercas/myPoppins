import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListHomePageRoutingModule } from './list-home-routing.module';

import { ListHomePage } from './list-home.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListHomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListHomePage]
})
export class ListHomePageModule {}
