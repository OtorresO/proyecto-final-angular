import { Component, OnInit, inject } from '@angular/core';
import { Teacher } from './models/teacher.model';
import { School } from './models/school.model';
import { AssessmentService } from './services/assessment.service';
import { CommonModule } from '@angular/common';
import { SchoolStaff } from './models/schoolStaff.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {
  public schoolsStaff: SchoolStaff | null = null;
  public schools: School[] | null = null;
  private assessmentService = inject(AssessmentService)
  public loading = true;
  public customTeacherToEvaluate: Teacher | null = null
  public currentDate: Date;
  public currentPage: number = 0
  public currentSchool: number=0;
  public startIndex=0
  constructor() {
    this.currentDate = new Date();
  }
  ngOnInit(): void {
    this.assessmentService.getSchoolStaff(this.currentPage).subscribe(schoolsStaff => {
      if(this.currentPage!=0){
        this.startIndex=this.startIndex+schoolsStaff.data.length
      }
      this.schoolsStaff = schoolsStaff
      
    });
    this.assessmentService.getSchools().subscribe(schools => {
      this.schools = schools
      this.currentSchool = schools[0].id

    });
    this.assessmentService.loading$.subscribe(loading => this.loading = loading);
  }

  displayTeacher(teacher: Teacher) {
    this.customTeacherToEvaluate = teacher
    console.log(this.currentDate,this.currentSchool,this.customTeacherToEvaluate)

  }
  onDateChange(event: any) {
    this.currentDate = new Date(event);
  }
  onSelectChange(event:any){
   this.currentSchool=event
  }

  changeCurrentPage(currentPage: number) {
    this.currentPage = currentPage
    if(currentPage==0){
      this.startIndex=0
    }
    this.ngOnInit()
  }

  nextPage(currentPage:number) {
    if (currentPage == 0) {
      this.currentPage = 1
      this.startIndex=0
    } else this.currentPage = 0
   
    this.ngOnInit()

  }

  evaluate(){
    console.log(this.currentDate,this.currentSchool,this.customTeacherToEvaluate)
  }





}
