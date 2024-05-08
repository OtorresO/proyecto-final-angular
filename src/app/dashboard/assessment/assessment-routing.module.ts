import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment.component';
import { EvaluateMonitoringComponent } from './evaluate-monitoring/evaluate-monitoring.component';

const routes: Routes = [
  {
    path: '',component: AssessmentComponent
  },
  {
    path:'evaluate-monitoring/:date/:school_id/:teacher_id/:page',component:EvaluateMonitoringComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
