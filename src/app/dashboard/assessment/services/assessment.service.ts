import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { School } from '../models/school.model';
import { BehaviorSubject, finalize } from 'rxjs';
import { SchoolStaff } from '../models/schoolStaff.model';
import { Rubric } from '../models/rubric.model';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
  }
  getSchoolStaff(page: number) {
    this.loadingSubject.next(true);
    
    return this.http.get<SchoolStaff>(`./assets/data/school-staff-page${page}.json`).pipe(

      finalize(() => this.loadingSubject.next(false))
    )
  }
  getSchools() {
    return this.http.get<School[]>('./assets/data/school.json');
  }

  getRubrics(){
    return this.http.get<Rubric[]>('./assets/data/rubrics.json');
  }

  
}
