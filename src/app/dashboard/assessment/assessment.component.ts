import { Component, OnInit, inject } from '@angular/core';
import { Teacher } from './models/teacher.model';
import { School } from './models/school.model';
import { AssessmentService } from './services/assessment.service';
import { CommonModule, DatePipe } from '@angular/common';
import { SchoolStaff } from './models/schoolStaff.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Evaluation from './models/evaluation.model';
import { forkJoin } from 'rxjs';
import { EvaluationsService } from './services/evaluations.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-assessment',
  providers: [DatePipe],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {
  public schoolsStaff: SchoolStaff | null = null;
  public schools: School[] | null = null;
  private assessmentService = inject(AssessmentService)
  private storageService = inject(StorageService)
  public loading = true;
  public customTeacherToEvaluate: Teacher | null = null
  public currentDate: string;
  public currentPage: number = 0
  public currentSchool: number = 0;
  public startIndex = 0
  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;

  }
  ngOnInit(selectDefault: boolean = true): void {

    forkJoin({
      schoolsStaffResponse: this.assessmentService.getSchoolStaff(this.currentPage),
      schoolsResponse: this.assessmentService.getSchools()
    }).subscribe(({ schoolsStaffResponse, schoolsResponse }) => {
      if (this.currentPage != 0) {
        if (this.startIndex + schoolsStaffResponse.data.length != schoolsStaffResponse.totalItems) {
          this.startIndex = this.startIndex + schoolsStaffResponse.data.length;
        } 
      }
      this.schoolsStaff = schoolsStaffResponse;

      // Asignar schools si es necesario
      this.schools = schoolsResponse;
      if (this.schools && this.schools.length > 0) {
        if (selectDefault) {
          this.currentSchool = this.schools[0].id;
        }
      }


      const evaluaciones: Evaluation[] = this.storageService.getItem('evaluations')
      if (evaluaciones) {
        if (this.schoolsStaff && this.schools && this.currentSchool && this.currentDate) {

          const teachersEvaluated = evaluaciones.filter(evaluacion => evaluacion.date == this.currentDate && evaluacion.idSchool == this.currentSchool)

          this.schoolsStaff.data.forEach(teacher => {
            teachersEvaluated.forEach(teacherEvaluated => {
              if (teacherEvaluated.idTeacher == teacher.id) {
                teacher.evaluacion = 1
              }
            })
          })

        }
      }



    });




    this.assessmentService.loading$.subscribe(loading => this.loading = loading);
  }

  displayTeacher(teacher: Teacher) {
    this.customTeacherToEvaluate = teacher
    console.log(this.currentDate, this.currentSchool, this.customTeacherToEvaluate)

  }
  onDateChange(event: any) {
    debugger
    this.currentDate = event
    this.ngOnInit(false)
    this.customTeacherToEvaluate = null
  }
  onSelectChange(event: any) {
    this.currentSchool = event
    this.ngOnInit(false)
    this.customTeacherToEvaluate = null
  }

  changeCurrentPage(currentPage: number) {
    this.currentPage = currentPage
    if (currentPage == 0) {
      this.startIndex = 0
    }
    this.ngOnInit(false)
  }

  nextPage(currentPage: number) {
    if (currentPage == 0) {
      this.currentPage = 1
      this.startIndex = 0
    } else this.currentPage = 0

    this.ngOnInit(false)

  }






}
