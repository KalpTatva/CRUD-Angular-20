import { Component, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { CourseTableComponent } from '../../components/course-table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-component',
  imports: [CourseTableComponent, RouterLink],
  template: `
    <div class="w-full flex flex-col">
      <div class="flex justify-center">
        <a
          class=" m-4 text-white bg-sky-900  hover:bg-sky-900  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-900  dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
          routerLink="/add-course"
          >Add Course</a
        >
      </div>
      <div class="w-full flex justify-center">
        <course-table [courses]="courses()" (remove)="HandleRemove($event)" />
      </div>
    </div>
  `,
})
export class DashboardComponent {
  message = signal('');
  numberOfCourses = signal(0);
  courses = signal([]);

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    const Response = await firstValueFrom(
      this.dashboardService.GetStringData()
    );
    const Courses = await firstValueFrom(this.dashboardService.GetAllCourses());

    if (Courses.data.length > 0) {
      this.courses.set(Courses.data);
      // console.log(Courses);
    }
  }

  HandleRemove(event: number) {
    console.log('event data : ', event);
    this.dashboardService.DeleteCourse(event).subscribe(
      (response) => {
        console.log('form data Edited successfully!', response);

      },
      (error) => {
        console.log('Error occured editing courses!', error);
      }
    );
  }
}
