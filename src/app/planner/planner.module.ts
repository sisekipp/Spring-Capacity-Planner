import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {plannerRoutes} from './planner-routing.module';
import { PlannerComponent } from './components/planner/planner.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [PlannerComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(plannerRoutes)
  ]
})
export class PlannerModule { }
