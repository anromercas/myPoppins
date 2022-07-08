import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindPoppinsPageRoutingModule } from './find-poppins-routing.module';

import { FindPoppinsPage } from './find-poppins.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindPoppinsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [FindPoppinsPage]
})
export class FindPoppinsPageModule {}
