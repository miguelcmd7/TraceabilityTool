import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatButtonToggleModule, MatCheckboxModule, MatSelectModule, MatOptionModule, MatSlideToggleModule } from '@angular/material';

import { NgModule } from '@angular/core';

const materialModules = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatSelectModule,
  MatOptionModule,
  MatSlideToggleModule
];
@NgModule({
imports: [materialModules],
exports: [materialModules],
declarations: []
})
export class SharedMaterialModule {
}