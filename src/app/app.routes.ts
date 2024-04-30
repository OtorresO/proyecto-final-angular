import { Routes } from '@angular/router'
import { authGuard } from './auth/guards/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: '', canActivate: [authGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule) },

];
