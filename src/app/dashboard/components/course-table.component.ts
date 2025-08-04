import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Course } from '../Models/course.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'course-table',
  imports: [RouterModule],
  template: `
    <div class=" m-4 relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Course Name</th>
            <th scope="col" class="px-6 py-3">Content</th>
            <th scope="col" class="px-6 py-3">Credits</th>
            <th scope="col" class="px-6 py-3">Department</th>
            <th scope="col" class="px-6 py-3">Create Date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          @for(course of courses; track course; let idx = $index) {
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
          >
            <td class="px-6 py-4">{{ idx + 1 }}</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ course.courseName }}
            </th>
            <td class="px-6 py-4">{{ course.courseContent }}</td>
            <td class="px-6 py-4">{{ course.credits }}</td>
            <td class="px-6 py-4">{{ course.department }}</td>
            <td class="px-6 py-4">{{ course.createdAt }}</td>
            <td class="px-6 py-4">
              <a
                [routerLink]="['/edit-course', course.courseId]"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
              <a
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline ps-2"
                (click)="deleteCourse(course.courseId)"
              >
                Delete
              </a>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class CourseTableComponent implements OnChanges {
  @Input() courses: Course[] = [];
  @Output() remove: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: any) {}

  deleteCourse(value: number) {
    this.remove.emit(value);
  }
}
