import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import Evaluation from '../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {
  private storageService = inject(StorageService)
  private countEvaluations = new  BehaviorSubject<number>(0)
  $countEvaluations = this.countEvaluations.asObservable()
  constructor() {
    const evaluations: Evaluation[] = this.storageService.getItem('evaluations')
    if (evaluations) {
      this.countEvaluations.next(evaluations.length)
    }
    console.log(this.countEvaluations)
  }
  actualizarCountEvaluations(nuevoValor: number) {
    this.countEvaluations.next(nuevoValor);
  }

 


}
