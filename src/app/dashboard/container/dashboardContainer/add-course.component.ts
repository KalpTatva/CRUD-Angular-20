import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PizzaPartyComponent } from '../../components/course-popup.component';
import { RouterLink } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'add-course',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslocoModule],
  template: `
    <div>
      <form
        class="max-w-sm mx-auto"
        [formGroup]="addCourse"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex justify-between mt-3">
          <span class="text-4xl dark:text-white"> {{ 'ADD_COURSE' | transloco }} </span>
          <a class="py-3 text-gray-700 font-semibold" routerLink="/">
            {{ 'BACK' | transloco }}
          </a>
        </div>
        <div class="my-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="CourseName"
            >{{ 'COURSE_NAME' | transloco }}</label
          >
          <input
            type="text"
            [placeholder]="'COURSE_NAME' | transloco"
            id="CourseName"
            formControlName="CourseName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("CourseName")) {
          <div class=" text-red-700">{{ 'COURSE_REQUIRED' | transloco }}</div>
          }
        </div>

        <div class="mb-5">
          <label
            for="CourseContent"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ 'COURSE_CONTENT' | transloco }}</label
          >
          <textarea
            id="CourseContent"
            rows="4"
            required
            formControlName="CourseContent"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            [placeholder]="'COURSE_CONTENT' | transloco"
          ></textarea>

          @if(Required("CourseContent")) {
          <div class=" text-red-700">
            {{ 'COURSE_CONTENT_REQUIRED' | transloco }}
          </div>
          }
        </div>

        <div class="mb-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="Credits"
            >{{ 'CREDITS' | transloco }}</label
          >
          <input
            type="text"
            [placeholder]="'CREDITS' | transloco"
            id="Credits"
            formControlName="Credits"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("Credits")) {
          <div class=" text-red-700">{{ 'CREDITS_REQUIRED' | transloco }}</div>
          } @else if(MatchExp("Credits")) {
          <div class=" text-red-700">
            {{ 'CREDITS_EXP_MATCH' | transloco }}
          </div>
          }
        </div>

        <div class="mb-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="Department"
            >{{ 'DEPARTMENT' | transloco }}</label
          >
          <input
            type="text"
            [placeholder]="'DEPARTMENT' | transloco"
            id="Department"
            formControlName="Department"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("Department")) {
          <div class=" text-red-700">
            {{ 'DEPARTMENT_REQUIRED' | transloco }}
          </div>
          }
        </div>

        <input type="hidden" formControlName="UserId" />

        <button
          type="submit"
          [disabled]="addCourse.invalid"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ 'SUBMIT' | transloco }}
        </button>
        <a
          class="p-2 text-blue-700 font-semibold ms-2 me-2 border-2 border-blue-600 rounded-2xl"
          routerLink="/"
        >
          {{ 'CANCLE' | transloco }}
        </a>
      </form>
    </div>
  `,
})
export class AddCourseComponent {
  private fb = inject(FormBuilder);
  private activeRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private transloco = inject(TranslocoService);

  constructor() {}

  addCourse = this.fb.group({
    CourseName: ['', [Validators.required]],
    CourseContent: ['', [Validators.required]],
    Credits: [, [Validators.required, Validators.pattern(/^[1-6]{1}$/)]],
    Department: [, [Validators.required]],
    UserId: [2, [Validators.required]],
  });

  onSubmit() {
    this.dashboardService.postCourses(this.addCourse.value).subscribe({
      next: (response) => {
        this.openSnackBar();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Error occured while posting courses!', error);
      },
    });
  }

  Required(value: string) {
    return (
      this.addCourse.get(`${value}`)?.hasError('required') &&
      (this.addCourse.get(`${value}`)?.touched ||
        this.addCourse.get(`${value}`)?.dirty)
    );
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      data: 'Course Added successfully!!',
      panelClass: ['custom-snackbar'],
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  MatchExp(value: string) {
    return this.addCourse.get(`${value}`)?.hasError('pattern');
  }
}
