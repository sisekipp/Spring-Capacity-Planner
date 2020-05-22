import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { plannerRoutes } from './planner-routing.module';
import { PlannerComponent } from './components/planner/planner.component';
import { FormsModule } from '@angular/forms';
import { CalculationService } from './services/calculation.service';
import { NgxsModule } from '@ngxs/store';
import { SprintCapacityPlanerState } from './state/sprint-capacity-planer.state';


@NgModule({
  declarations: [PlannerComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(plannerRoutes),
    NgxsModule.forFeature([
      SprintCapacityPlanerState
    ])
  ],
  providers: [
    CalculationService
  ]
})
export class PlannerModule { }
