import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:  [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class AppNgMaterialModule { }
