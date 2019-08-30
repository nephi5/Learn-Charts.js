import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'custom' },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'custom',
    component: CustomTooltipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
