import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedProfilesPageRoutingModule } from './saved-profiles-routing.module';

import { SavedProfilesPage } from './saved-profiles.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedProfilesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SavedProfilesPage]
})
export class SavedProfilesPageModule {}
