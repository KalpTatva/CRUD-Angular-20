import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth.service';
@Component({
  selector: 'auth-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="">
      <div
        class=" h-full flex flex-col items-center justify-center px-6 py-8 mx-auto"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              [formGroup]="login"
              (ngSubmit)="onSubmit()"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  formControlName="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                @if(Required("email")) {
                <div class=" text-red-700">email is required.</div>
                } @else if(MatchExp("email")) {
                <div class=" text-red-700">Invalid user email</div>
                }
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  formControlName="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                @if(Required("password")) {
                  <div class=" text-red-700">paassword is required.</div>
                } @else if(MatchExp("password")) {
                  <div class=" text-red-700">Atleast contain 1-uppercase, 1-lowercase, 1-special charecter, 1-number  and length should be 8</div>
                }
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      formControlName="rememberme"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >Remember me</label
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Forgot password?</a
                >
              </div>
              <button
                [disabled]="login.invalid"
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >Sign up</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthServices);

  login = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,}$/
        ),
      ],
    ],
    rememberme: false,
  });

  onSubmit() {
    this.authService.PostLogin(this.login.value).subscribe({
      next: (response) => {
        console.log('form data added successfully!', response);
        console.log("authtoken", response.accessToken);
        console.log("refreshToken", response.refreshToken);
        // this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Error occured while posting courses!', error);
      },
    });
  }

  Required(value: string) {
    return (
      this.login.get(`${value}`)?.hasError('required') &&
      (this.login.get(`${value}`)?.touched || this.login.get(`${value}`)?.dirty)
    );
  }

  MatchExp(value: string) {
    return this.login.get(`${value}`)?.hasError('pattern');
  }
}
