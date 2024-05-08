import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AssessmentComponent } from './assessment/assessment.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,children:[
      {
        path:'profile',component:ProfileComponent
        
      },
      {
        path:'assessment',loadChildren:()=>import('./assessment/assessment.module').then(m=>m.AssessmentModule)
      }
    ]
  
  },
  {
    path:'',redirectTo:'dashboard/profile',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
