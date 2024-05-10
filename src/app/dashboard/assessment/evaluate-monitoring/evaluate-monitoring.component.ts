import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssessmentService } from '../services/assessment.service';
import { Rubric } from '../models/rubric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Evaluation, { IndicadorEvaluation } from '../models/evaluation.model';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { School } from '../models/school.model';
import { Teacher } from '../models/teacher.model';
import { SchoolStaff } from '../models/schoolStaff.model';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfile } from '../../models/user.model';
import { EvaluationsService } from '../services/evaluations.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-evaluate-monitoring',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ChartComponent],
  templateUrl: './evaluate-monitoring.component.html',
  styleUrl: './evaluate-monitoring.component.css'
})
export class EvaluateMonitoringComponent implements OnInit {
  /* Servicios */
  private assessmentService = inject(AssessmentService)
  private userService = inject(UserProfileService)
  private storageService = inject(StorageService)
  private evaluationsService = inject(EvaluationsService)
  /* Variables que muestran data */
  public userProfile: UserProfile | null = null
  public school: School | null = null
  public schoolStaff: SchoolStaff | null = null
  public teacher: Teacher | null = null
  public date: string | null = null

  public factorOrganizacional: Rubric | null = null
  public factorSocial: Rubric | null = null
  public factorPedagogical: Rubric | null = null
  public factorTechnological: Rubric | null = null
  public labelsFactors: string[] | null = null
  public dataFactors: number[] | null = null
  public porcentajeTotal: number = 0


  /* Variables para crear la evaluacion*/
  public evaluation: Evaluation | null = {} as Evaluation
  public indicadoresOrganizational: IndicadorEvaluation[] | null = null;
  public indicadoresSocial: IndicadorEvaluation[] | null = null;
  public indicadoresPedagogical: IndicadorEvaluation[] | null = null;
  public indicadoresTechnological: IndicadorEvaluation[] | null = null;


  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.userService.userData$.subscribe(userData => {
      this.userProfile = userData;

    });


    this.route.params.subscribe(params => {
      this.date = params['date']
      const schoolId = params['school_id']
      const teacherId = params['teacher_id']
      const page = params['page']
      this.assessmentService.getSchools().subscribe(schools => {
        const school = schools.find(school => school.id == schoolId)!
        this.school = school
        this.evaluation = { ...this.evaluation!, idSchool: school.id }
      })
      this.assessmentService.getSchoolStaff(page).subscribe(schoolStaff => {
        const teacher = schoolStaff.data.find(teacher => teacher.id == teacherId)!
        this.teacher = teacher
        this.evaluation = { ...this.evaluation!, idTeacher: teacher.id }
      })
      this.evaluation = { ...this.evaluation!, date: params['date'] }

    })

    this.assessmentService.getRubrics().subscribe(rubrics => {
      const [factorOrganizacional, factorSocial, factorPedagogical, factorTechnological] = rubrics
      const { factor: textFactorOrganizacional } = factorOrganizacional
      const { factor: textFactorSocial } = factorSocial
      const { factor: textFactorPedagogical } = factorPedagogical
      const { factor: textFactorTechnological } = factorTechnological
      this.labelsFactors = [textFactorOrganizacional, textFactorSocial, textFactorPedagogical, textFactorTechnological]

      this.factorOrganizacional = factorOrganizacional
      this.factorSocial = factorSocial
      this.factorPedagogical = factorPedagogical
      this.factorTechnological = factorTechnological




      const evaluationsStorage: Evaluation[] = this.storageService.getItem('evaluations')
      if (evaluationsStorage) {
        console.log('pasa por aqui if')
        const indexEvaluation = evaluationsStorage.findIndex(evaluacion => this.date == evaluacion.date && this.teacher?.id == evaluacion.idTeacher && this.school?.id == evaluacion.idSchool)
        if (indexEvaluation != -1) {
          const evaluation = evaluationsStorage[indexEvaluation]
          evaluation.factores?.forEach(factor => {
            if (factor.idFactor == factorOrganizacional?.idFactor) {
              this.indicadoresOrganizational = factor.indicadores ? factor.indicadores : factorOrganizacional.indicadores.map(e => {
                return {
                  idIndicador: e.idIndicador,
                  idValoracionSeleccionada: null,
                  valoracionDescription: null,
                  valor: null
                }
              })

              this.factorOrganizacional = { ...factorOrganizacional, recomendacion: factor.recomendacion }
              console.log('pasa orgnanizacional')
            }
            if (factor.idFactor == factorSocial?.idFactor) {
              this.indicadoresSocial = factor.indicadores ? factor.indicadores : factorSocial.indicadores.map(e => {
                return {
                  idIndicador: e.idIndicador,
                  idValoracionSeleccionada: null,
                  valoracionDescription: null,
                  valor: null
                }
              })
              this.factorSocial = { ...factorSocial, recomendacion: factor.recomendacion }
              console.log('pasa social')
            }
            if (factor.idFactor == factorPedagogical?.idFactor) {
              this.indicadoresPedagogical = factor.indicadores ? factor.indicadores : factorPedagogical.indicadores.map(e => {
                return {
                  idIndicador: e.idIndicador,
                  idValoracionSeleccionada: null,
                  valoracionDescription: null,
                  valor: null
                }
              })
              this.factorPedagogical = { ...factorPedagogical, recomendacion: factor.recomendacion }
              console.log('pasa pedagogical')
            }
            if (factor.idFactor == factorTechnological?.idFactor) {
              this.indicadoresTechnological = factor.indicadores ? factor.indicadores : factorTechnological.indicadores.map(e => {
                return {
                  idIndicador: e.idIndicador,
                  idValoracionSeleccionada: null,
                  valoracionDescription: null,
                  valor: null
                }
              })

              this.factorTechnological = { ...factorTechnological, recomendacion: factor.recomendacion }
              console.log('pasa technological')
            }
          })
          this.evaluation = evaluation
          this.updateDataForChart()
        } else {
          console.log('pasa por aqui else')
          this.dataFactors = [0, 0, 0, 0]
          this.indicadoresOrganizational = factorOrganizacional.indicadores.map(e => {
            return {
              idIndicador: e.idIndicador,
              idValoracionSeleccionada: null,
              valoracionDescription: null,
              valor: null
            }
          })
          this.indicadoresSocial = factorSocial.indicadores.map(e => {
            return {
              idIndicador: e.idIndicador,
              idValoracionSeleccionada: null,
              valoracionDescription: null,
              valor: null
            }
          })
          this.indicadoresPedagogical = factorPedagogical.indicadores.map(e => {
            return {
              idIndicador: e.idIndicador,
              idValoracionSeleccionada: null,
              valoracionDescription: null,
              valor: null
            }
          })
          this.indicadoresTechnological = factorTechnological.indicadores.map(e => {
            return {
              idIndicador: e.idIndicador,
              idValoracionSeleccionada: null,
              valoracionDescription: null,
              valor: null
            }
          })
          this.evaluation = {
            ...this.evaluation!,
            factores: [
              {
                factor: factorOrganizacional.factor,
                idFactor: factorOrganizacional.idFactor,
                recomendacion: null,
                indicadores: null
              },
              {
                factor: factorSocial.factor,
                idFactor: factorSocial.idFactor,
                recomendacion: null,
                indicadores: null
              },
              {
                factor: factorPedagogical.factor,
                idFactor: factorPedagogical.idFactor,
                recomendacion: null,
                indicadores: null
              },
              {
                factor: factorTechnological.factor,
                idFactor: factorTechnological.idFactor,
                recomendacion: null,
                indicadores: null
              }
            ]
          }
        }
      } else {
        this.dataFactors = [0, 0, 0, 0]
        this.indicadoresOrganizational = factorOrganizacional.indicadores.map(e => {
          return {
            idIndicador: e.idIndicador,
            idValoracionSeleccionada: null,
            valoracionDescription: null,
            valor: null
          }
        })
        this.indicadoresSocial = factorSocial.indicadores.map(e => {
          return {
            idIndicador: e.idIndicador,
            idValoracionSeleccionada: null,
            valoracionDescription: null,
            valor: null
          }
        })
        this.indicadoresPedagogical = factorPedagogical.indicadores.map(e => {
          return {
            idIndicador: e.idIndicador,
            idValoracionSeleccionada: null,
            valoracionDescription: null,
            valor: null
          }
        })
        this.indicadoresTechnological = factorTechnological.indicadores.map(e => {
          return {
            idIndicador: e.idIndicador,
            idValoracionSeleccionada: null,
            valoracionDescription: null,
            valor: null
          }
        })
        this.evaluation = {
          ...this.evaluation!,
          factores: [
            {
              factor: factorOrganizacional.factor,
              idFactor: factorOrganizacional.idFactor,
              recomendacion: null,
              indicadores: null
            },
            {
              factor: factorSocial.factor,
              idFactor: factorSocial.idFactor,
              recomendacion: null,
              indicadores: null
            },
            {
              factor: factorPedagogical.factor,
              idFactor: factorPedagogical.idFactor,
              recomendacion: null,
              indicadores: null
            },
            {
              factor: factorTechnological.factor,
              idFactor: factorTechnological.idFactor,
              recomendacion: null,
              indicadores: null
            }
          ]
        }


      }


    })

  }

  updateRecomendationToEvaluation(idFactor: number, event: any) {
    const recomendacion = event.target.value
    this.evaluation?.factores?.forEach(factor => {
      if (factor.idFactor == idFactor) {
        factor.recomendacion = recomendacion
      }
    })
  }
  changeValoracion(event: any, idIndicador: number, idFactor: number) {
    let factor: Rubric = {} as Rubric
    let indicadores: IndicadorEvaluation[] = [] as IndicadorEvaluation[]
    if (this.factorOrganizacional?.idFactor == idFactor) {
      factor = this.factorOrganizacional
      indicadores = this.indicadoresOrganizational!
    }

    if (this.factorSocial?.idFactor == idFactor) {
      factor = this.factorSocial
      indicadores = this.indicadoresSocial!
    }

    if (this.factorPedagogical?.idFactor == idFactor) {
      factor = this.factorPedagogical
      indicadores = this.indicadoresPedagogical!
    }

    if (this.factorTechnological?.idFactor == idFactor) {
      factor = this.factorTechnological
      indicadores = this.indicadoresTechnological!
    }

    const indicator = factor.indicadores.find(e => e.idIndicador == idIndicador)
    if (indicator) {
      const valoracion = indicator.valoraciones.find(e => e.idValoracion == event)
      indicadores.forEach(e => {
        if (e.idIndicador == idIndicador) {
          e.idValoracionSeleccionada = event ? event : 0
          e.valoracionDescription = valoracion ? valoracion.descripcion : ''
          e.valor = valoracion ? valoracion.valor : 0
        }
      })
      this.evaluation?.factores?.forEach(currentFactor => {
        if (currentFactor.idFactor == factor.idFactor)
          currentFactor.indicadores = indicadores
      })

      this.updateDataForChart()

    }


  }
  updateDataForChart() {
    const idFactorOrganizational = this.factorOrganizacional?.idFactor
    const idFactorSocial = this.factorSocial?.idFactor
    const idFactorPedagogical = this.factorPedagogical?.idFactor
    const idfactorTechnological = this.factorTechnological?.idFactor

    const factorOrganizacional = this.evaluation?.factores?.find(factor => factor.idFactor == idFactorOrganizational)
    const factorSocial = this.evaluation?.factores?.find(factor => factor.idFactor == idFactorSocial)
    const factorPedagogical = this.evaluation?.factores?.find(factor => factor.idFactor == idFactorPedagogical)
    const factorTechnological = this.evaluation?.factores?.find(factor => factor.idFactor == idfactorTechnological)

    let calcFactorOrganizacional = 0
    let calcFactorSocial = 0
    let calcFactorPedagogical = 0
    let calcFactorTechnological = 0

    const countIndicatorsfromFactorOrganizacional = factorOrganizacional?.indicadores?.filter(indicador => indicador.valor != null)
    const countIndicatorsfromFactorSocial = factorSocial?.indicadores?.filter(indicador => indicador.valor != null)
    const countIndicatorsfromFactorPedagogical = factorPedagogical?.indicadores?.filter(indicador => indicador.valor != null)
    const countIndicatorsfromFactorTechnological = factorTechnological?.indicadores?.filter(indicador => indicador.valor != null)

    factorOrganizacional?.indicadores?.forEach((indicadorEvaluation, index, array) => {
      if (indicadorEvaluation.valor && countIndicatorsfromFactorOrganizacional?.length! > 0) {
        calcFactorOrganizacional = calcFactorOrganizacional + (indicadorEvaluation.valor * 100 / (countIndicatorsfromFactorOrganizacional?.length! * 3))
      }

    })

    factorSocial?.indicadores?.forEach((indicadorEvaluation, index, array) => {
      if (indicadorEvaluation.valor && countIndicatorsfromFactorSocial?.length! > 0) {
        calcFactorSocial = calcFactorSocial + (indicadorEvaluation.valor * 100 / (countIndicatorsfromFactorSocial?.length! * 3))
      }

    })
    factorPedagogical?.indicadores?.forEach((indicadorEvaluation, index, array) => {
      if (indicadorEvaluation.valor && countIndicatorsfromFactorPedagogical?.length! > 0) {
        calcFactorPedagogical = calcFactorPedagogical + (indicadorEvaluation.valor * 100 / (countIndicatorsfromFactorPedagogical?.length! * 3))
      }
    })
    factorTechnological?.indicadores?.forEach((indicadorEvaluation, index, array) => {
      if (indicadorEvaluation.valor && countIndicatorsfromFactorTechnological?.length! > 0) {
        calcFactorTechnological = calcFactorTechnological + (indicadorEvaluation.valor * 100 / (countIndicatorsfromFactorTechnological?.length! * 3))
      }
    })
    this.dataFactors = [Math.floor(calcFactorOrganizacional), Math.floor(calcFactorSocial), Math.floor(calcFactorPedagogical), Math.floor(calcFactorTechnological)]
    this.porcentajeTotal = Math.floor(this.dataFactors.reduce((prev, current) => prev + current, 0)/this.dataFactors.length)


  }

  guardarEvaluation() {

    let evaluaciones: Evaluation[] = this.storageService.getItem('evaluations')
    if (evaluaciones) {
      const findEvaluation = evaluaciones.findIndex(evaluacion => this.date == evaluacion.date && this.teacher?.id == evaluacion.idTeacher && this.school?.id == evaluacion.idSchool)
      if (findEvaluation != -1) {
        evaluaciones[findEvaluation] = this.evaluation!
      } else {
        evaluaciones.push(this.evaluation!)
        this.evaluationsService.actualizarCountEvaluations(evaluaciones.length)
      }
    } else {
      evaluaciones = [] as Evaluation[]
      evaluaciones.push(this.evaluation!)
      this.evaluationsService.actualizarCountEvaluations(evaluaciones.length)
    }
    this.storageService.setItem('evaluations', evaluaciones)
    alert('¡La evaluación ha sido añadida exitosamente!')
  }








}
