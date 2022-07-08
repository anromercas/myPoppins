import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindPoppinsPage } from './find-poppins.page';

const routes: Routes = [
  {
    path: '',
    component: FindPoppinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindPoppinsPageRoutingModule {}
