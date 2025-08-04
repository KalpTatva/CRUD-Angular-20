import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'add-course',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <form
        class="max-w-sm mx-auto"
        [formGroup]="addCourse"
        (ngSubmit)="onSubmit()"
      >
        <span class="max-w-sm mx-auto text-4xl"> Add Course </span>
        <div class="my-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="CourseName"
            >Course Name</label
          >
          <input
            type="text"
            placeholder="Course Name"
            id="CourseName"
            formControlName="CourseName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("CourseName")) {
          <div class=" text-red-700">course name is required.</div>
          }
        </div>

        <div class="mb-5">
          <label
            for="CourseContent"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Course Content</label
          >
          <textarea
            id="CourseContent"
            rows="4"
            required
            formControlName="CourseContent"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Course Content"
          ></textarea>

          @if(Required("CourseContent")) {
          <div class=" text-red-700">content is required.</div>
          }
        </div>

        <div class="mb-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="Credits"
            >Credits</label
          >
          <input
            type="text"
            placeholder="Credits"
            id="Credits"
            formControlName="Credits"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("Credits")) {
          <div class=" text-red-700">credits are required.</div>
          } @else if(MatchExp("Credits")) {
          <div class=" text-red-700">
            credits should be in between 1-6 numbers only.
          </div>
          }
        </div>

        <div class="mb-5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="Department"
            >Department</label
          >
          <input
            type="text"
            placeholder="Department"
            id="Department"
            formControlName="Department"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          @if(Required("Department")) {
          <div class=" text-red-700">Department is required.</div>
          }
        </div>

        <input type="hidden" formControlName="UserId" />

        <button
          type="submit"
          [disabled]="addCourse.invalid"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        <pre>{{ addCourse.value | json }}</pre>
      </form>
    </div>
  `,
})
export class AddCourseComponent {
  fb = inject(FormBuilder);
  dashboardService = inject(DashboardService);

  addCourse = this.fb.group({
    CourseName: ['', [Validators.required]],
    CourseContent: ['', [Validators.required]],
    Credits: [, [Validators.required, Validators.pattern(/^[1-6]{1}$/)]],
    Department: [, [Validators.required]],
    UserId: [2, [Validators.required]],
  });

  onSubmit() {
    // console.log('submit data : ', this.addCourse.value);
    this.dashboardService.postCourses(this.addCourse.value).subscribe(
      (response) => {
        console.log('form data added successfully!', response);
      },
      (error) => {
        console.log('Error occured while posting courses!', error);
      }
    );
  }

  Required(value: string) {
    return (
      this.addCourse.get(`${value}`)?.hasError('required') &&
      (this.addCourse.get(`${value}`)?.touched ||
        this.addCourse.get(`${value}`)?.dirty)
    );
  }

  MatchExp(value: string) {
    return this.addCourse.get(`${value}`)?.hasError('pattern');
  }
}
