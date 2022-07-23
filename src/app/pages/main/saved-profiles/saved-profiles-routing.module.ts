import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedProfilesPage } from './saved-profiles.page';

const routes: Routes = [
  {
    path: '',
    component: SavedProfilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedProfilesPageRoutingModule {}
