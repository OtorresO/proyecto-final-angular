import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EvaluationsService } from './dashboard/assessment/services/evaluations.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),EvaluationsService],
  
  
  
};
