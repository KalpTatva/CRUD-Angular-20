import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PizzaPartyComponent } from '../../components/course-popup.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'edit-course',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div>
      <form
        class="max-w-sm mx-auto"
        [formGroup]="editCourse"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex justify-between">
          <span class="text-4xl"> Edit Course </span>
          <a class="py-3 text-gray-700 font-semibold" routerLink="/"> Back </a>
        </div>
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
        <input type="hidden" formControlName="Courseid" />

        <button
          type="submit"
          [disabled]="editCourse.invalid"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit Course
        </button>
        <a
          class="p-2 text-blue-700 font-semibold ms-2 me-2 border-2 border-blue-600 rounded-2xl"
          routerLink="/"
        >
          Cancle
        </a>
      </form>
    </div>
  `,
})
export class EditCourseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  dashboardService = inject(DashboardService);
  testId = 0;
  courseName = signal('');
  courseContent = signal('');
  credits = signal(0);
  Courseid = signal(0);
  userId = signal(0);
  department = signal('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['id'];
      this.FetchCourse(this.testId);
    });
  }

  FetchCourse(id: number) {
    this.dashboardService.GetCourseById(id).subscribe(
      (response) => {
        console.log('Edit data recevied!', response);
        this.editCourse.get('CourseName')?.setValue(response.data.courseName);
        this.editCourse.get('CourseContent')?.setValue(response.data.courseContent);
        this.editCourse.get('Credits')?.setValue(response.data.credits);
        this.editCourse.get('Department')?.setValue(response.data.department);
        this.editCourse.get('UserId')?.setValue(response.data.createdById);
        this.editCourse.get('Courseid')?.setValue(response.data.courseid);
      },
      (error) => {
        console.log('Error occured fetching course!', error);
      }
    );
  }

  editCourse = this.fb.group({
    CourseName: [this.courseName(), [Validators.required]],
    CourseContent: [this.courseContent(), [Validators.required]],
    Credits: [
      this.credits(),
      [Validators.required, Validators.pattern(/^[1-6]{1}$/)],
    ],
    Department: [this.department(), [Validators.required]],
    Courseid: [this.Courseid(), [Validators.required]],
    UserId: [this.userId(), [Validators.required]],
  });

  onSubmit() {
    console.log('submit data : ', this.editCourse.value);
    this.dashboardService.EditCourse(this.editCourse.value).subscribe(
      (response) => {
        console.log('form data Edited successfully!', response);
        this.openSnackBar();
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Error occured editing courses!', error);
      }
    );
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      data: 'Course Edited successfully!!',
      panelClass: ['custom-snackbar'],
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  Required(value: string) {
    return (
      this.editCourse.get(`${value}`)?.hasError('required') &&
      (this.editCourse.get(`${value}`)?.touched ||
        this.editCourse.get(`${value}`)?.dirty)
    );
  }

  MatchExp(value: string) {
    return this.editCourse.get(`${value}`)?.hasError('pattern');
  }
}
