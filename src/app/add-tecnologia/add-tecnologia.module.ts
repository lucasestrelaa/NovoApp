import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTecnologiaPageRoutingModule } from './add-tecnologia-routing.module';

import { AddTecnologiaPage } from './add-tecnologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTecnologiaPageRoutingModule
  ],
  declarations: [AddTecnologiaPage]
})
export class AddTecnologiaPageModule {}
