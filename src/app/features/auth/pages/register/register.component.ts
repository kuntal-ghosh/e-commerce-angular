import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: PasswordMatchValidator });

    this.registerForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      console.log("this.registerForm",this.registerForm);
      // Mark fields as touched when they change
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.value) {
          control.markAsTouched();
        }
      });

      if (this.registerForm.hasError('passwordMismatch')) {
        this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        this.registerForm.get('confirmPassword')?.setErrors(null);
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const { confirmPassword, ...registrationData } = this.registerForm.value;
    console.log("registrationData",registrationData.email);

    this.authService.register(registrationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: Error) => {
          this.error = error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(value => {
      console.log('registerForm values:', value);
    });

    this.registerForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
