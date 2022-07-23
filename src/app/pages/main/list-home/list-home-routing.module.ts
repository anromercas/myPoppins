import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListHomePage } from './list-home.page';

const routes: Routes = [
  {
    path: '',
    component: ListHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListHomePageRoutingModule {}
