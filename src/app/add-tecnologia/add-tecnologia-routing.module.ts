import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTecnologiaPage } from './add-tecnologia.page';

const routes: Routes = [
  {
    path: '',
    component: AddTecnologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTecnologiaPageRoutingModule {}
