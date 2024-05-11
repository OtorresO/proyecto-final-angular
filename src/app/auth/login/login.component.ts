import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  public test = true;
  public form!: FormGroup;
  public credentials:any = environment.userCredentials
  ngOnInit(): void {
    this.initForm();
    
  }

  initForm() {
    this.form = this.formBuilder.group({
      userName: new FormControl(environment.userCredentials.userName, [Validators.required]),
      password: new FormControl(environment.userCredentials.password, [Validators.required]),
    });

  }

  login(){
    this.authService.set('USER_CREDENTIALS',this.form.value)
    this.router.navigate(['/'])
  }

  
}
