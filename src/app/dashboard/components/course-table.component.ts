import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Course } from '../Models/course.interface';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from './course-delete-dialog.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
@Component({
  selector: 'course-table',
  imports: [RouterModule, MatButtonModule, TranslocoModule],
  template: `
    <div class=" m-4 relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">{{ 'ID' | transloco }}</th>
            <th scope="col" class="px-6 py-3">
              {{ 'COURSE_NAME' | transloco }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ 'COURSE_CONTENT' | transloco }}
            </th>
            <th scope="col" class="px-6 py-3">{{ 'CREDITS' | transloco }}</th>
            <th scope="col" class="px-6 py-3">
              {{ 'DEPARTMENT' | transloco }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ 'CREATED_DATE' | transloco }}
            </th>
            <th scope="col" class="px-6 py-3">{{ 'ACTION' | transloco }}</th>
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
                [routerLink]="['/edit-course', course.courseid]"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {{ 'EDIT' | transloco }}
              </a>
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline ps-2 cursor-pointer"
                (click)="deleteCourse(course.courseName, course.courseid)"
              >
                {{ 'DELETE' | transloco }}
              </button>
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
  readonly dialog = inject(MatDialog);
  private transloco = inject(TranslocoService);
  ngOnChanges(changes: any) {}

  deleteCourse(course: string, value: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { name: course, courseId: value },
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.remove.emit(value);
      } else {
        console.log('Deletion canceled.', result);
      }
    });
  }
}
